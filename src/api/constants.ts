export const NETWORK_MAP_ALCHEMY: { [key: number]: string } = {
  // Ethereum Mainnet and Testnets
  1: 'eth-mainnet',            // Ethereum Mainnet
  3: 'eth-ropsten',            // Ropsten Testnet (Note: Ropsten has been deprecated)
  4: 'eth-rinkeby',            // Rinkeby Testnet (Note: Rinkeby has been deprecated)
  5: 'eth-goerli',             // Goerli Testnet
  42: 'eth-kovan',             // Kovan Testnet (Note: Kovan has been deprecated)
  11155111: 'eth-sepolia',     // Sepolia Testnet

  // Polygon (Matic)
  137: 'polygon-mainnet',      // Polygon Mainnet
  80001: 'polygon-mumbai',     // Polygon Mumbai Testnet

  // Arbitrum
  42161: 'arbitrum-mainnet',   // Arbitrum One Mainnet
  421611: 'arbitrum-rinkeby',  // Arbitrum Rinkeby Testnet

  // Optimism
  10: 'optimism-mainnet',      // Optimism Mainnet
  69: 'optimism-kovan',        // Optimism Kovan Testnet

  // Binance Smart Chain (BSC)
  56: 'bsc-mainnet',           // Binance Smart Chain Mainnet
  97: 'bsc-testnet',           // Binance Smart Chain Testnet

  // Avalanche
  43114: 'avalanche-mainnet',  // Avalanche Mainnet
  43113: 'avalanche-fuji',     // Avalanche Fuji Testnet

  // Fantom
  250: 'ftm-mainnet',          // Fantom Mainnet
  4002: 'ftm-testnet',         // Fantom Testnet

  // zkSync
  324: 'zksync-mainnet',       // zkSync Mainnet
  280: 'zksync-testnet',       // zkSync Testnet

  // StarkNet
  1101: 'starknet-mainnet',    // StarkNet Mainnet
  510: 'starknet-testnet',     // StarkNet Testnet

  // Gnosis (formerly xDai)
  100: 'gnosis-mainnet',       // Gnosis Chain (formerly xDai)

  // Celo
  42220: 'celo-mainnet',       // Celo Mainnet
  44787: 'celo-alfajores',     // Celo Alfajores Testnet

  // Near
  1313161554: 'aurora-mainnet', // Aurora Mainnet (on Near)
  1313161555: 'aurora-testnet', // Aurora Testnet (on Near)

  // Palm
  11297108109: 'palm-mainnet', // Palm Mainnet
  11297108099: 'palm-testnet', // Palm Testnet

  // Cronos
  25: 'cronos-mainnet',        // Cronos Mainnet
  338: 'cronos-testnet',       // Cronos Testnet

  // Moonbeam
  1284: 'moonbeam-mainnet',    // Moonbeam Mainnet
  1287: 'moonbase-alpha',      // Moonbeam Testnet (Moonbase Alpha)

  // Harmony
  1666600000: 'harmony-mainnet-shard0', // Harmony Mainnet Shard 0
  1666700000: 'harmony-testnet-shard0', // Harmony Testnet Shard 0

  // OKExChain
  66: 'okexchain-mainnet',     // OKExChain Mainnet
  65: 'okexchain-testnet',     // OKExChain Testnet

  // Klaytn
  8217: 'klaytn-mainnet',      // Klaytn Mainnet
  1001: 'klaytn-baobab',       // Klaytn Testnet (Baobab)

  // Solana
  101: 'solana-mainnet',       // Solana Mainnet
  102: 'solana-testnet',       // Solana Testnet

  // Additional networks
  1663: 'loopring-mainnet',    // Loopring Mainnet
  1442: 'polygon-zkevm-mainnet', // Polygon zkEVM Mainnet
  1441: 'polygon-zkevm-testnet', // Polygon zkEVM Testnet
  59140: 'linea-testnet',      // Linea Testnet
  9001: 'evmos-mainnet',       // Evmos Mainnet
  9000: 'evmos-testnet',       // Evmos Testnet

// Manta Network
  344: 'manta-mainnet',        // Manta Mainnet
  346: 'manta-testnet',        // Manta Testnet

  // Mantle
  5000: 'mantle-mainnet',      // Mantle Mainnet
  5001: 'mantle-testnet',      // Mantle Testnet

  // Add any additional networks supported by Alchemy as they become available
};

export const NETWORK_MAP_COINGECKO: { [key: number]: string } = {
  // Ethereum Mainnet and Testnets
  1: 'ethereum',            // Ethereum Mainnet
  3: 'ropsten',             // Ropsten Testnet (CoinGecko может не поддерживать, так как тестнеты не всегда присутствуют)
  4: 'rinkeby',             // Rinkeby Testnet (аналогично, может не поддерживаться)
  5: 'goerli',              // Goerli Testnet (аналогично)
  42: 'kovan',              // Kovan Testnet (аналогично)
  11155111: 'sepolia',      // Sepolia Testnet (аналогично)

  // Polygon (Matic)
  137: 'polygon-pos',       // Polygon Mainnet
  80001: 'polygon-mumbai',  // Polygon Mumbai Testnet

  // Arbitrum
  42161: 'arbitrum-one',    // Arbitrum One Mainnet
  421611: 'arbitrum-rinkeby', // Arbitrum Rinkeby Testnet (аналогично)

  // Optimism
  10: 'optimistic-ethereum', // Optimism Mainnet
  69: 'optimism-kovan',     // Optimism Kovan Testnet (аналогично)

  // Binance Smart Chain (BSC)
  56: 'binance-smart-chain', // Binance Smart Chain Mainnet
  97: 'bsc-testnet',        // Binance Smart Chain Testnet (аналогично)

  // Avalanche
  43114: 'avalanche',       // Avalanche Mainnet
  43113: 'avalanche-fuji',  // Avalanche Fuji Testnet

  // Fantom
  250: 'fantom',            // Fantom Mainnet
  4002: 'fantom-testnet',   // Fantom Testnet (аналогично)

  // zkSync
  324: 'zksync',            // zkSync Mainnet
  280: 'zksync-testnet',    // zkSync Testnet (аналогично)

  // StarkNet
  1101: 'starknet',         // StarkNet Mainnet
  510: 'starknet-testnet',  // StarkNet Testnet (аналогично)

  // Gnosis (formerly xDai)
  100: 'xdai',              // Gnosis Chain (formerly xDai)

  // Celo
  42220: 'celo',            // Celo Mainnet
  44787: 'celo-alfajores',  // Celo Alfajores Testnet

  // Near
  1313161554: 'aurora',     // Aurora Mainnet (on Near)
  1313161555: 'aurora-testnet', // Aurora Testnet (on Near)

  // Palm
  11297108109: 'palm',      // Palm Mainnet
  11297108099: 'palm-testnet', // Palm Testnet (аналогично)

  // Cronos
  25: 'cronos',             // Cronos Mainnet
  338: 'cronos-testnet',    // Cronos Testnet (аналогично)

  // Moonbeam
  1284: 'moonbeam',         // Moonbeam Mainnet
  1287: 'moonbase-alpha',   // Moonbeam Testnet (Moonbase Alpha)

  // Harmony
  1666600000: 'harmony-shard-0', // Harmony Mainnet Shard 0
  1666700000: 'harmony-testnet-shard0', // Harmony Testnet Shard 0

  // OKExChain
  66: 'okex-chain',         // OKExChain Mainnet
  65: 'okex-chain-testnet', // OKExChain Testnet (аналогично)

  // Klaytn
  8217: 'klay-token',       // Klaytn Mainnet
  1001: 'klaytn-baobab',    // Klaytn Testnet (Baobab)

  // Solana
  101: 'solana',            // Solana Mainnet
  102: 'solana-testnet',    // Solana Testnet (аналогично)

  // Additional networks
  1663: 'loopring',         // Loopring Mainnet
  1442: 'polygon-zkevm',    // Polygon zkEVM Mainnet
  1441: 'polygon-zkevm-testnet', // Polygon zkEVM Testnet
  59140: 'linea-testnet',   // Linea Testnet (аналогично)
  9001: 'evmos',            // Evmos Mainnet
  9000: 'evmos-testnet',    // Evmos Testnet (аналогично)

  // Manta Network
  344: 'manta-mainnet',     // Manta Mainnet
  346: 'manta-testnet',     // Manta Testnet (аналогично)

  // Mantle
  5000: 'mantle-mainnet',   // Mantle Mainnet
  5001: 'mantle-testnet',   // Mantle Testnet (аналогично)
};

export const NETWORK_MAP_COINMARKETCAP: { [chainId: number]: string } = {
  1: "ethereum",                 // Ethereum Mainnet
  56: "binance-smart-chain",     // Binance Smart Chain (BNB Chain)
  137: "polygon",                // Polygon (Matic)
  43114: "avalanche",            // Avalanche
  250: "fantom",                 // Fantom Opera
  10: "optimism",                // Optimism
  42161: "arbitrum",             // Arbitrum
  100: "xdai",                   // Gnosis Chain (xDai)
  1666600000: "harmony",         // Harmony
  25: "cronos",                  // Cronos
  128: "heco",                   // Huobi ECO Chain
  66: "okexchain",               // OKExChain
  122: "theta",                  // Theta
  321: "kucoin-community-chain", // KuCoin Community Chain (KCC)
  40: "telos",                   // Telos
  57: "syscoin",                 // Syscoin
  288: "boba",                   // Boba Network
  1088: "metis",                 // Metis
  52: "coinex-smart-chain",      // CoinEx Smart Chain
  70: "hoo-smart-chain",         // Hoo Smart Chain
  1284: "moonbeam",              // Moonbeam
  1285: "moonriver",             // Moonriver
  2222: "kava",                  // Kava
  1663: "celo",                  // Celo (Baklava Testnet)
  1231: "songbird",              // Songbird
  53935: "dfk-chain",            // DFK Chain (DeFi Kingdoms)
  1818: "eurus",                 // Eurus
  88: "tomochain",               // TomoChain
  1313161554: "aurora",          // Aurora
  42220: "celo",                 // Celo (Mainnet)
  106: "velas",                  // Velas
  4689: "iotex",                 // IoTeX
  30: "rsk",                     // RSK (Rootstock)
  592: "astar",                  // Astar
  3: "ropsten",                  // Ropsten (Ethereum Testnet)
  5: "goerli",                   // Goerli (Ethereum Testnet)
  97: "bsc-testnet",             // BSC Testnet
  80001: "mumbai",               // Mumbai (Polygon Testnet)
  4002: "fantom-testnet",        // Fantom Testnet
  10001: "ethw",                 // EthereumPoW (ETHW)
  11111: "wagmi",                // WAGMI Network
  55555: "reichain",             // Rei Chain
  421611: "arbitrum-rinkeby",    // Arbitrum Rinkeby Testnet
  1666700000: "harmony-testnet", // Harmony Testnet
  1287: "moonbase-alpha",        // Moonbase Alpha (Moonbeam Testnet)
  1313161555: "aurora-testnet",  // Aurora Testnet
  42261: "oasis-testnet",        // Oasis Testnet
  338: "cronos-testnet",         // Cronos Testnet
};

