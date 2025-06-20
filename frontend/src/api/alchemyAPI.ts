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
    method = 'POST',
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
