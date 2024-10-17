const logger = require('../utils/logger');
const { delay } = require('../../scripts/helpers');
const { updateCoinPrices, checkForNewCoins } = require('../services/coinService');


// Function to run tasks in an infinite loop without overlap
async function runTasksInLoop() {
  while (true) {
    logger.info('Starting updateCoinPrices task');
    await updateCoinPrices();
    logger.info('Finished updateCoinPrices task');
 
    // Wait for 1 min before starting the cycle again
    // await delay(6000); // 1 min in milliseconds

    logger.info('Starting checkForNewCoins task');
    await checkForNewCoins();
    logger.info('Finished checkForNewCoins task');
    

  }
}

module.exports = runTasksInLoop;
