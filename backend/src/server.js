const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');
const connectToDatabase = require('./db');
const setupDatabase = require('./tasks/setupDatabase');
const runTasksInLoop = require('./tasks/startDatabaseTasks');

(async () => {
  try {
    
    await connectToDatabase();
        
    await setupDatabase();

    runTasksInLoop();

  // Start server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to start server: ", error);
    logger.error('Failed to start server:', error.message);
    process.exit(1); 
  }
})();

