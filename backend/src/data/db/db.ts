import mongoose from 'mongoose';
import config from '../../config/config';
import { logger } from '../../utils/logger';

export const connectToDatabase = async () => {
  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established successfully.');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected.');
  });

  try {
    await mongoose.connect(config.mongoUri);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`MongoDB initial connection error: ${error.message}`);
    } else {
      logger.error(`MongoDB initial connection error: ${String(error)}`);
    }
    process.exit(1);
  }
};
