const mongoose = require('mongoose');
const { Coin } = require('../src/models/Coin');
const { fetchAllPrices, prepareBulkOperations } = require('../src/services/coinService');
const config = require('../src/config/config');
const connectToDatabase = require('../src/db');
const logger = require('../src/utils/logger');
const { delay } = require('./helpers');

async function updateCoinPrices() {
  try {
    await connectToDatabase();
    
    const coins = await Coin.find({}, 'id current_price');
    const ids = coins.map(coin => coin.id);
    const delayBetweenRequests = config.maxDelay / config.maxRequestsPerMinute;

    const allPrices = await fetchAllPrices(ids, config.perPage, delayBetweenRequests, config.vsCurrency);

    const { bulkOperations, updatedRecordsCount } = prepareBulkOperations(allPrices, coins);

    if (bulkOperations.length > 0) {
      await Coin.bulkWrite(bulkOperations);
      logger.info(`Coin prices updated in the database. Total updated records: ${updatedRecordsCount}`);
    } else {
      logger.info('No coin prices required updating');
    }
  } catch (error) {
    logger.error(`Error updating coin prices: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
}

updateCoinPrices();
