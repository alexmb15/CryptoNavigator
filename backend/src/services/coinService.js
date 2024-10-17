const Coin = require('../models/Coin');
const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');
const { delay } = require('../../scripts/helpers');

async function exponentialBackoffRequest(url, params, maxRetries = config.maxRetries, initialDelay = config.initialDelay) {
  let retries = 0;
  let delayTime = initialDelay;

  while (retries < maxRetries) {
    try {
      const response = await axios.get(url, { params });
      return response;//.data;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 429 || (status >= 500 && status < 600)) {
          retries++;
          const jitter = Math.random() * 1000;
          logger.warn(`Error ${status}. Retrying in ${delayTime + jitter}ms... (Attempt ${retries} of ${maxRetries})`);
          await delay(delayTime + jitter);
          delayTime *= 2;
        } else {
          logger.error(`HTTP error ${status}: ${error.message}`);
          throw error;
        }
      } else {
        logger.error(`Network error: ${error.message}`);
        throw error;
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} retries due to rate limiting or server errors.`);
}

/**
 * Fetches all coin prices by paginating through the list of IDs.
 * 
 * @param {Array} ids - List of coin IDs.
 * @param {number} perPage - Number of records to fetch per page.
 * @param {number} delayBetweenRequests - Delay between API requests in milliseconds.
 * @param {string} [vsCurrency=config.vsCurrency] - The currency to use for fetching prices.
 * @returns {Array} - Aggregated list of all price data.
 */
async function fetchAllPrices(ids, perPage, delayBetweenRequests, vsCurrency = config.vsCurrency) {
  let allPrices = [];
  for (let i = 0; i < ids.length; i += perPage) {
    const chunk = ids.slice(i, i + perPage);
    const url = `${config.coinGeckoApiUrl}/coins/markets`;
    const params = { vs_currency: vsCurrency, ids: chunk.join(',') };
    const { data } = await exponentialBackoffRequest(url, params); //axios.get(url, { params });
    allPrices = allPrices.concat(data);

    // Delay to comply with rate limits
    if (i + perPage < ids.length) {
      await delay(delayBetweenRequests);
    }
  }
  return allPrices;
}

/**
 * Prepares the bulk operations for MongoDB based on the fetched prices.
 * 
 * @param {Array} allPrices - List of fetched price data.
 * @param {Array} coins - List of coins currently in the database.
 * @returns {Object} - An object containing the list of bulk operations and the count of updated records.
 */
function prepareBulkOperations(allPrices, coins) {
  let updatedRecordsCount = 0;
  const bulkOperations = allPrices.map(priceData => {
    const coin = coins.find(c => c.id === priceData.id);
    if (!coin || coin.current_price !== priceData.current_price) {
      updatedRecordsCount++;
      return {
        updateOne: {
          filter: { id: priceData.id },
          update: {
            image_url: priceData.image, // Storing the image URL
            current_price: priceData.current_price,
            market_cap: priceData.market_cap,
            total_volume: priceData.total_volume,
            high_24h: priceData.high_24h,
            low_24h: priceData.low_24h,
            price_change_24h: priceData.price_change_24h,
            price_change_percentage_24h: priceData.price_change_percentage_24h,
            market_cap_rank: priceData.market_cap_rank,
            fully_diluted_valuation: priceData.fully_diluted_valuation,
            last_updated: priceData.last_updated,
          },
        },
      };
    }
    return null;
  }).filter(op => op !== null);

  logger.debug(`Prepared ${bulkOperations.length} bulk operations.`);
  return { bulkOperations, updatedRecordsCount };
}

/**
 * Updates the prices of all coins in the database by fetching the latest data from the CoinGecko API.
 *
 * @param {Object} options - Options for configuring the price update process.
 * @param {number} [options.perPage=config.perPage] - The number of records to fetch per request to the API.
 * @param {number} [options.maxRequestsPerMinute=config.maxRequestsPerMinute] - The maximum number of API requests allowed per minute.
 * @param {number} [options.maxDelay=config.maxDelay] - The maximum delay time (in milliseconds) between API requests to comply with rate limiting.
 * @param {string} [options.vsCurrency=config.vsCurrency] - The currency to use for fetching prices.
 * 
 * @returns {Promise<void>} - A promise that resolves when the price update process is complete.
 */
async function updateCoinPrices({
  perPage = config.perPage,
  maxRequestsPerMinute = config.maxRequestsPerMinute,
  maxDelay = config.maxDelay,
  vsCurrency = config.vsCurrency,
} = {}) {
  try {
    const coins = await Coin.find({}, 'id current_price');
    const ids = coins.map(coin => coin.id);
    const delayBetweenRequests = maxDelay / maxRequestsPerMinute; // Delay between API requests in milliseconds

    const allPrices = await fetchAllPrices(ids, perPage, delayBetweenRequests, vsCurrency);

    const { bulkOperations, updatedRecordsCount } = prepareBulkOperations(allPrices, coins);

    if (bulkOperations.length > 0) {
      await Coin.bulkWrite(bulkOperations);
      logger.info(`Coin prices updated in the database. Total updated records: ${updatedRecordsCount}`);
    } else {
      logger.info('No coin prices required updating');
    }
  } catch (error) {
    logger.error(`Error updating coin prices: ${error.message}`, { stack: error.stack });
  }
}

/**
 * Checks for new coins and adds them to the database.
 */
async function checkForNewCoins() {
  try {
    const url = `${config.coinGeckoApiUrl}/coins/list?include_platform=true`;
    const { data: allCoins } = await exponentialBackoffRequest(url); //axios.get(url);

    const existingCoins = await Coin.find({}, 'id');
    const existingIds = new Set(existingCoins.map(coin => coin.id));

    const newCoins = allCoins.filter(coin => !existingIds.has(coin.id));
    if (newCoins.length > 0) {
      const bulkOperations = newCoins.map(coin => ({
        insertOne: { document: coin },
      }));

      await Coin.bulkWrite(bulkOperations);
      logger.info(`${newCoins.length} new coins added to the database`);
    } else {
      logger.info('No new coins found');
    }
  } catch (error) {
    logger.error(`Error checking for new coins: ${error.message}`);
  }
}


async function getCoinPrice(contractAddress, networkId) {
  //console.log("contractAddress: %s", contractAddress);
  //console.log("networkId", networkId);
  // const coin = await Coin.findOne({ [`platforms.${networkId}`]: contractAddress });
  const coin = await Coin.findOne({ [`platforms.ethereum`]: contractAddress });
  if (!coin) {
    throw new Error('Coin not found');
  }
  return {
    symbol: coin.symbol,
    name: coin.name,
    price: coin.current_price,
    logo: coin.image_url,
  };
}

module.exports = {
  fetchAllPrices,
  prepareBulkOperations,
  updateCoinPrices,
  checkForNewCoins,
  getCoinPrice,
};
