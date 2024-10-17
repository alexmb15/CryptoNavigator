const express = require('express');
const coinRoutes = require('./routes/coinRoutes');
const connectToDatabase = require('./db');
const logger = require('./utils/logger');
const cors = require('cors');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// 
app.use('/api', coinRoutes);

// Middleware 
app.use((err, req, res, next) => {
  //logger.error(err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
