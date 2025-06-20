# CryptoNavigator

CryptoNavigator is a web application for navigating and analyzing cryptocurrency markets. The project is still in development.

At the moment, only basic portfolio functionality is implemented — specifically, tracking of tokens.

---

## Features (planned)

- Token tracking and portfolio balance
- Interactive charts and historical prices
- NFT management
- Authentication
- Spending analytics

---

## Tech Stack

- **Frontend**: React.js, TypeScript, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Package Manager**: pnpm

---

## Project Structure

```
CryptoNavigator/
├── frontend/
│   └── src/
│       ├── components/
│       ├── api/
│       ├── context/
│       ├── redux/
│       └── assets/

├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       ├── services/
│       └── utils/

├── pnpm-workspace.yaml
└── package.json

```

---

## Getting Started

### Prerequisites

- Node.js
- pnpm (`npm install -g pnpm`)

### Installation

```bash
git clone https://github.com/alexmb15/CryptoNavigator.git
cd CryptoNavigator
pnpm install
cd backend && cp .env.example .env && cd ..
cd frontend && cp .env.example .env && cd ..
```

### Running the App

```bash
pnpm dev
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:53080

---

## License

MIT
