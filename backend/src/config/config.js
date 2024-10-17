/*
const dotenv = require('dotenv');
dotenv.config();
  */

const result = require('dotenv').config({ path: '.env' });
if (result.error) {
  console.error('Error loading .env file:', result.error);
}

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/coingeckoDB',
  coinGeckoApiUrl: process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3',
  maxRetries: parseInt(process.env.MAX_RETRIES, 10) || 10,
  initialDelay: parseInt(process.env.INITIAL_DELAY, 10) || 1000,
  cronUpdatePrices: process.env.CRON_UPDATE_PRICES || '0 * * * *',
  cronCheckNewCoins: process.env.CRON_CHECK_NEW_COINS || '0 0 * * *',
  perPage: parseInt(process.env.PER_PAGE, 10) || 250,
  maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE, 10) || 5,
  maxDelay: parseInt(process.env.MAX_DELAY, 10) || 60000,
  vsCurrency: process.env.VS_CURRENCY || 'usd', 
  port: process.env.PORT || 53080,
};
