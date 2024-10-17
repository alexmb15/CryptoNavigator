# CryptoNavigator

CryptoNavigator is a web application designed to provide users with tools for navigating and analyzing cryptocurrency markets. This project leverages multiple modern web technologies to deliver a rich user experience for tracking market trends, viewing price charts, and managing portfolios.

## Features

- Cryptocurrency market overview
- Interactive charts and historical data
- Portfolio management
- Secure user authentication
- Integrated NFT management
- Token tracking and spending analytics

## Tech Stack

- **Frontend**: React.js, TypeScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux
- **Styling**: CSS, Bootstrap, CSS Modules

## Project Structure

### Frontend (`/src`)
- **`/components`**: Contains reusable UI components such as `BridgePage`, `Header`, `Navbar`, `PortfolioPage`, and various subcomponents for managing tokens, transactions, NFTs, and settings.
- **`/api`**: Contains modules that interact with external cryptocurrency services like Alchemy, CoinGecko, and CoinMarketCap.
- **`/context`**: Implements the Web3 context to manage blockchain interactions and user session data.
- **`/redux`**: Includes reducers, store configuration, and selectors for managing portfolio state.
- **`/public`**: Contains static assets such as icons and the main HTML template.

### Backend (`/backend`)
- **`/src`**: Contains server-side code for handling requests, managing data, and serving API endpoints.
  - **Controllers**: Handle incoming API requests (e.g., `coinController.js`).
  - **Routes**: Define API routes (e.g., `coinRoutes.js`, `tokenRoutes.js`).
  - **Models**: Define MongoDB schemas for `Coin` and `Tokens`.
  - **Services**: Contain business logic for data processing (`coinService.js`).
  - **Utils**: Include utility functions like logging (`logger.js`).
  - **Tasks**: Handle database setup and background tasks (`setupDatabase.js`, `startDatabaseTasks.js`).
- **`/scripts`**: Scripts for initial data setup and periodic updates (e.g., `createInitialCoinList.js`, `updateCoinPrices.js`).

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/alexmb15/CryptoNavigator.git
   ```

2. Navigate to the project directory:
   ```sh
   cd CryptoNavigator
   ```

3. Install dependencies for both frontend and backend:
   ```sh
   yarn install
   cd backend
   yarn install
   cd ..
   ```

4. Set up environment variables:
   - Create a `.env` file in both the root and `backend` directories, and fill in the required values using `.env.example` as a template.

### Running the Application

To start the development server for the frontend:
```sh
yarn start
```

To start the backend server:
```sh
cd backend
yarn start
```

The application should now be running on [http://localhost:3000](http://localhost:3000) for the frontend, and the backend API will be available on [http://localhost:53080](http://localhost:53080).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
