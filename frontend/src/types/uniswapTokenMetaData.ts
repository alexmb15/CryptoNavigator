// Represents a single token in the token list
export interface UniswapTokenMetaData {
    chainId: number; // Chain ID where the token exists (e.g., 1 for Ethereum mainnet)
    address: string; // Token contract address
    name: string; // Token name (e.g., "1inch")
    symbol: string; // Token symbol (e.g., "1INCH")
    decimals: number; // Number of decimals for the token
    logoURI?: string; // Optional URI for the token logo
    extensions?: UniswapTokenExtensions; // Optional extensions object
}

// Extensions for a token, including bridge information
interface UniswapTokenExtensions {
    bridgeInfo?: Record<string, UniswapBridgeInfo>; // Optional bridge info mapping chain IDs to token addresses
}

// Bridge information for a token on another chain
interface UniswapBridgeInfo {
    tokenAddress: string; // Token address on the bridged chain
}