//without cache
import { NETWORK_MAP_ALCHEMY } from "./constants";
import { Address } from "viem";

// Interface for Alchemy API response
interface AlchemyResponse<T = any> {
    jsonrpc: string;
    id: number;
    result?: T;
    error?: {
        code: number;
        message: string;
    };
}

// Interfaces for token data
export type TokenBalance = {
    contractAddress: Address;
    tokenBalance: string;
    error?: string;
};

export type TokenMetadata = {
    decimals: number;
    logo: string | null;
    name: string;
    symbol: string;
    price: number;
};

export type TokenBalancesWithMetadata = TokenBalance & TokenMetadata;

// Global request ID counter
let requestId = 0;

/**
 * General function to make requests to the Alchemy API.
 * @param address - Wallet address
 * @param chainId - Chain identifier
 * @param endpoint - API method
 * @param method - HTTP method (default is POST)
 * @param params - Parameters for the request
 * @param headers - Additional headers
 * @returns Alchemy API response
 */
export const fetchAlchemyData = async <T = any>(
    address: Address,
    chainId: number,
    endpoint: string,
    method: string = 'POST',
    params: any[] = [],
    headers: Record<string, string> = {}
): Promise<AlchemyResponse<T>> => {
    if (!address || !chainId) {
        throw new Error("Address and ChainId are required");
    }

    const network = NETWORK_MAP_ALCHEMY[chainId];
    if (!network) {
        throw new Error(`Unsupported chainId: ${chainId}`);
    }

    const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
    if (!apiKey) {
        throw new Error("Alchemy API key is required");
    }

    const url = `https://${network}.g.alchemy.com/v2/${apiKey}`;
    //console.log(">>> Endpoint: ", endpoint);
    //console.log("Fetching from URL:", url);

    // Increment the global request ID for each request
    requestId++;

    const options: RequestInit = {
        method,
        headers: {
            "Accept": "application/json",  // Explicitly specify the expected response format
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify({
            id: requestId,  // Use the incremented request ID
            jsonrpc: "2.0",
            method: endpoint,
            params: [address, ...params],
        }),
        redirect: 'follow',  // Automatically follow HTTP redirects
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("fetchAlchemyData: Response:", data);
        if (!response.ok) {
            throw new Error(`Error fetching data from Alchemy: ${response.statusText}`);
        }
        if (data.error) {
            throw new Error(`Alchemy API error: ${data.error.message} (code: ${data.error.code})`);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data from Alchemy:', error);
        throw error;
    }
};

/**
 * Function to fetch all token balances without caching.
 * @param address - Wallet address
 * @param chainId - Chain identifier
 * @returns Array of token balances
 */
export const fetchTokenBalances = async (
    address: Address,
    chainId: number
): Promise<TokenBalance[]> => {
    let allTokenBalances: TokenBalance[] = [];
    let pageKey: string | undefined;

    do {
        const params = pageKey ? ["erc20", { pageKey }] : ["erc20"];
        console.log("Fetching with pageKey:", pageKey);

        const response = await fetchAlchemyData<{ tokenBalances: TokenBalance[], pageKey?: string }>(
            address,
            chainId,
            'alchemy_getTokenBalances',
            'POST',
            params
        );

        if (response.result?.tokenBalances) {
            allTokenBalances = [...allTokenBalances, ...response.result.tokenBalances];
        }

        pageKey = response.result?.pageKey;
        console.log("New pageKey:", pageKey);

    } while (pageKey);

    return allTokenBalances;
};

/**
 * Function to fetch token metadata without caching.
 * @param contractAddress - Token contract address
 * @param chainId - Chain identifier
 * @returns Token metadata
 */
export const fetchTokenMetadata = async (
    contractAddress: Address,
    chainId: number
): Promise<TokenMetadata | null> => {
    try {
        const response = await fetchAlchemyData<TokenMetadata>(
            contractAddress,
            chainId,
            'alchemy_getTokenMetadata'
        );

        return response.result || null;
    } catch (error) {
        console.error(`Failed to fetch metadata for token ${contractAddress}: ${error instanceof Error ? error.message : error}`);
        return null;
    }
};


/*
//with cache
import { NETWORK_MAP } from "./constants";
import { Address } from "viem";

// Interface for Alchemy API response
interface AlchemyResponse<T = any> {
    jsonrpc: string;
    id: number;
    result?: T;
    error?: {
        code: number;
        message: string;
    };
}

// Interfaces for token data
export type TokenBalance = {
    contractAddress: Address;
    tokenBalance: string;
    error?: string;
};

export type TokenMetadata = {
    decimals: number;
    logo: string | null;
    name: string;
    symbol: string;
};

export type TokenBalancesWithMetadata = TokenBalance & TokenMetadata;

// In-memory caches for token balances and metadata
const tokenBalancesCache: Record<string, TokenBalance[]> = {};
const tokenMetadataCache: Record<string, TokenMetadata> = {};

// Global request ID counter
let requestId = 0;

/!**
 * General function to make requests to the Alchemy API.
 * @param address - Wallet address
 * @param chainId - Chain identifier
 * @param endpoint - API method
 * @param method - HTTP method (default is POST)
 * @param params - Parameters for the request
 * @param headers - Additional headers
 * @returns Alchemy API response
 *!/
export const fetchAlchemyData = async <T = any>(
    address: Address,
    chainId: number,
    endpoint: string,
    method: string = 'POST',
    params: any[] = [],
    headers: Record<string, string> = {}
): Promise<AlchemyResponse<T>> => {
    if (!address || !chainId) {
        throw new Error("Address and ChainId are required");
    }

    const network = NETWORK_MAP[chainId];
    if (!network) {
        throw new Error(`Unsupported chainId: ${chainId}`);
    }

    const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
    if (!apiKey) {
        throw new Error("Alchemy API key is required");
    }

    const url = `https://${network}.g.alchemy.com/v2/${apiKey}`;
    console.log("Fetching from URL:", url);

    // Increment the global request ID for each request
    requestId++;

    const options = {
        method,
        headers: {
            "content-type": "application/json",
            ...headers,
        },
        body: JSON.stringify({
            id: requestId,  // Use the incremented request ID
            jsonrpc: "2.0",
            method: endpoint,
            params: [address, ...params],
        }),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error fetching data from Alchemy: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(`Alchemy API error: ${data.error.message} (code: ${data.error.code})`);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data from Alchemy:', error);
        throw error;
    }
};

/!**
 * Function to fetch all token balances with pagination support and caching.
 * @param address - Wallet address
 * @param chainId - Chain identifier
 * @returns Array of token balances
 *!/
export const fetchTokenBalances = async (
    address: Address,
    chainId: number
): Promise<TokenBalance[]> => {
    const cacheKey = `${address}-${chainId}`;
    if (tokenBalancesCache[cacheKey]) {
        console.log("Using cached token balances for:", cacheKey);
        return tokenBalancesCache[cacheKey];
    }

    let allTokenBalances: TokenBalance[] = [];
    let pageKey: string | undefined;

    do {
        const response = await fetchAlchemyData<{ tokenBalances: TokenBalance[], pageKey?: string }>(
            address,
            chainId,
            'alchemy_getTokenBalances',
            'POST',
            pageKey ? [{ pageKey }] : []
        );

        if (response.result?.tokenBalances) {
            allTokenBalances = [...allTokenBalances, ...response.result.tokenBalances];
        }

        pageKey = response.result?.pageKey;

    } while (pageKey);

    // Cache the result
    tokenBalancesCache[cacheKey] = allTokenBalances;

    return allTokenBalances;
};

/!**
 * Function to fetch token metadata with caching.
 * @param contractAddress - Token contract address
 * @param chainId - Chain identifier
 * @returns Token metadata
 *!/
export const fetchTokenMetadata = async (
    contractAddress: Address,
    chainId: number
): Promise<TokenMetadata | null> => {
    const cacheKey = `${contractAddress}-${chainId}`;
    if (tokenMetadataCache[cacheKey]) {
        console.log("Using cached metadata for token:", cacheKey);
        return tokenMetadataCache[cacheKey];
    }

    try {
        const response = await fetchAlchemyData<TokenMetadata>(
            contractAddress,
            chainId,
            'alchemy_getTokenMetadata'
        );

        const metadata = response.result || null;
        if (metadata) {
            // Cache the result
            tokenMetadataCache[cacheKey] = metadata;
        }

        return metadata;
    } catch (error) {
        console.error(`Failed to fetch metadata for token ${contractAddress}: ${error instanceof Error ? error.message : error}`);
        return null;
    }
};
*/
