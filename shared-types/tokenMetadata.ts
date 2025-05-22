// Represents a single token in the token list
export interface TokenMetaData {
    chainId: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string | null;
    tags?: string[] | null;
    verified?: boolean | null;
    totalSupply?: string | null;
    holders?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}

