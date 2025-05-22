import axios from 'axios';
import config  from '../config/config';
import {UniswapTokenMetaData} from "../shared-types";

let uniswapTokenList: UniswapTokenMetaData[] = [];

export async function loadUniswapTokenList() {
    try {
        const response = await axios.get(config.uniswapTokenList);
        uniswapTokenList = response.data.tokens;
        console.log(`[loadUniswapTokenList] Token list loaded successfully. Tokens: ${uniswapTokenList.length}`);
    } catch (err) {
        console.error(`[loadUniswapTokenList] Error loading token list: ${err}`);
    }
}

export function getTokenMetadata(chainId: number, tokenAddress: string): UniswapTokenMetaData | undefined {
    return uniswapTokenList.find(
        t => t.chainId === +chainId && t.address.toLowerCase() === tokenAddress.toLowerCase()
    );
}

export function getTokensMetadata(
    chainId: number,
    tokenAddresses: string[],
): Array<UniswapTokenMetaData | undefined> {
    return tokenAddresses.map(address => getTokenMetadata(chainId, address));
}


export function getUniswapTokenList(): UniswapTokenMetaData[] {
    return uniswapTokenList;
}