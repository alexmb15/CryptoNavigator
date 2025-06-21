import { Address } from 'viem';
import { UniswapTokenMetaData } from '../types/uniswapTokenMetaData';

function buildBaseUrl(): string {
    const { REACT_APP_SERVER_API_URL, REACT_APP_SERVER_PORT } = process.env;

    if (!REACT_APP_SERVER_API_URL) {
        throw new Error('REACT_APP_SERVER_API_URL is not defined');
    }

    const trimmedPort = REACT_APP_SERVER_PORT?.trim();
    return trimmedPort ? `${REACT_APP_SERVER_API_URL}:${trimmedPort}` : REACT_APP_SERVER_API_URL;
}

async function fetchCoinData(
    contractAddress: Address,
    networkId: number
): Promise<UniswapTokenMetaData | undefined> {
    try {
        const baseUrl = buildBaseUrl();
        const url = `${baseUrl}/api/tokens/${networkId}/${contractAddress}`;

        const response = await fetch(url);
        console.log('fetchCoinData: received response:', response);

        if (!response.ok) {
            throw new Error(`Error fetching coin data: ${response.statusText}`);
        }

        const data: UniswapTokenMetaData = await response.json();
        console.log('fetchCoinData: received data:', data);

        return data;
    } catch (error) {
        console.error('Error fetching coin data:', error);
    }
}

export default fetchCoinData;
