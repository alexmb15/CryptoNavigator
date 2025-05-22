import { app } from './app';
import config  from './config/config';
import {logger} from "./utils/logger";
import {connectToDatabase} from "./data/db/db";


(async () => {
  try {
    // Load Uniswap Token List from site
    //await loadUniswapTokenList();

    //connect to MongoDB
    await connectToDatabase();

    // Start server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.info(`Failed to start server: ${error}`);
    process.exit(1); 
  }
})();

