const mongoose = require('mongoose');
const { Coin } = require('../src/models/Coin');
const { exponentialBackoffRequest } = require('../src/services/coinService');
const config = require('../src/config/config');
const connectToDatabase = require('../src/db');
const logger = require('../src/utils/logger');

async function createInitialCoinList() {
  try {
    await connectToDatabase();
    
    const url = `${config.coinGeckoApiUrl}/coins/list?include_platform=true`;
    const data = await exponentialBackoffRequest(url);
    const bulkOperations = data.map(coin => ({
      updateOne: {
        filter: { id: coin.id },
        update: { $setOnInsert: coin },
        upsert: true,
      },
    }));

    await Coin.bulkWrite(bulkOperations);
    logger.info('Initial coin list created/updated in the database');
  } catch (error) {
    logger.error(`Error creating initial coin list: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = createInitialCoinList;

