import {TokenModel} from "./db/models/token.model";
import {TokenMetaData} from "../types/tokenMetadata";


export const tokenRepository = {
    async getAllTokens(): Promise<TokenMetaData[]> {
        return TokenModel.find({}).lean();
    },
    async getTokenMetadata(chainId: number, tokenAddress: string): Promise<TokenMetaData | null> {
        return TokenModel.findOne({chainId, address: tokenAddress });
    },
    async getTokensMetadata(chainId: number, tokenAddresses: string[]): Promise<TokenMetaData[] | null> {
        return  TokenModel.find({
            chainId,
            address: {$in: tokenAddresses}
        }).lean();
    }
}