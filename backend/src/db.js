const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./utils/logger');

async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
