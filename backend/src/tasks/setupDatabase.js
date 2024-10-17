const Coin  = require('../models/Coin');
const logger = require('../utils/logger');
const { createInitialCoinList } = require('../../scripts/createInitialCoinList');

async function setupDatabase() {
  const isDbPopulated = await Coin.countDocuments() > 0;

  if (!isDbPopulated) {
    logger.info("Database is empty, creating initial coin list...");
    await createInitialCoinList();
  } else {
    logger.info("Database already populated, skipping initial coin list creation.");
  }
}

module.exports = setupDatabase;
