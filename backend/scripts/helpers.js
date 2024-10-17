const axios = require('axios');
const logger = require('../src/utils/logger');
const config = require('../src/config/config');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function exponentialBackoffRequest(url, params, maxRetries = config.maxRetries, initialDelay = config.initialDelay) {
  let retries = 0;
  let delayTime = initialDelay;

  while (retries < maxRetries) {
    try {
      const response = await axios.get(url, { params });
      return response.data;
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

module.exports = {
  exponentialBackoffRequest,
  delay,	
};

