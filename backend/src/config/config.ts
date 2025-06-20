import * as dotenv from 'dotenv';
dotenv.config();

const result = dotenv.config({ path: '.env' });
if (result.error) {
  console.error('Error loading .env file:', result.error);
}

// Destructure Mongo config for clarity
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_AUTH_SOURCE,
  MONGO_TLS
} = process.env;

const mongoUri = `mongodb://${MONGO_USER}:${encodeURIComponent(
    MONGO_PASSWORD!
)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}&tls=${MONGO_TLS}`;

interface Config {
  mongoUri: string;
  uniswapTokenList: string,
  coinGeckoApiUrl: string;
  maxRetries: number;
  initialDelay: number;
  cronUpdatePrices: string;
  cronCheckNewCoins: string;
  perPage: number;
  maxRequestsPerMinute: number;
  maxDelay: number;
  vsCurrency: string;
  port: number | string;
}

const config: Config = {
  mongoUri,
  uniswapTokenList: process.env.UNISWAP_TOKEN_LIST_URL || 'https://tokens.uniswap.org',
  coinGeckoApiUrl: process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3',
  maxRetries: parseInt(process.env.MAX_RETRIES || '10', 10),
  initialDelay: parseInt(process.env.INITIAL_DELAY || '1000', 10),
  cronUpdatePrices: process.env.CRON_UPDATE_PRICES || '0 * * * *',
  cronCheckNewCoins: process.env.CRON_CHECK_NEW_COINS || '0 0 * * *',
  perPage: parseInt(process.env.PER_PAGE || '250', 10),
  maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '5', 10),
  maxDelay: parseInt(process.env.MAX_DELAY || '60000', 10),
  vsCurrency: process.env.VS_CURRENCY || 'usd',
  port: process.env.PORT || 53080,
};

export default config;
``