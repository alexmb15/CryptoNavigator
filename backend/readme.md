# Backend Service for Cryptocurrency Price Retrieval

## Project Overview

This backend service provides an API to retrieve the price of a cryptocurrency based on the network ID and smart contract address. It is built using Node.js, Express, and MongoDB.

## Project Structure

- **src/config/**: Configuration files.
- **src/controllers/**: Controllers for handling HTTP requests.
- **src/models/**: Mongoose models for MongoDB collections.
- **src/routes/**: Route definitions.
- **src/services/**: Business logic and data processing.
- **src/utils/**: Utility modules such as logger.
- **src/app.js**: Main application setup.
- **src/db.js**: MongoDB connection setup.
- **src/server.js**: Server start script.
- **scripts/**: Scripts for database initialization and price updates.
  - **createInitialCoinList.js**: Script to populate the initial list of coins.
  - **updateCoinPrices.js**: Script to update coin prices.
  - **helpers.js**: Helper functions like `delay`.
- **.env**: Environment variables for configuration.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/backend.git
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory:
    ```bash
    touch .env
    ```

    Add the following environment variables to the `.env` file:
    ```env
    MONGO_URI=mongodb://localhost:27017/coingeckoDB
    PORT=53080
    VS_CURRENCY=usd
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Initializing the Database

To create the initial list of coins in the database, run the following command:

```bash
node scripts/createInitialCoinList.js
