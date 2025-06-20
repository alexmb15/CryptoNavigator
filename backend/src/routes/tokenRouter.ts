import {Router, Request, Response} from 'express';
import {tokenRepository} from '../data/tokenRepository';
import {param, query, validationResult} from 'express-validator';
import {TokenMetaData} from "../types/tokenMetadata";

// Define interface for route parameters
interface TokenParams {
    tokenAddress: string;
    networkId: string;
}

interface NetworkIdParam {
    networkId: string;
}

interface ListQuery {
    tokens: string;
}

export const tokenRouter = Router();

/**
 * @route GET /tokens
 * @description Retrieves metadata for all tokens
 * @returns {TokenMetaData[]} Array of token metadata
 */
tokenRouter.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const getAllTokenList: TokenMetaData[] = await tokenRepository.getAllTokens();
        return res.json(getAllTokenList);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return res.status(500).json({message: errorMessage});
    }
});

/**
 * @route GET /tokens/:networkId/:tokenAddress
 * @description Retrieves metadata for a specific token
 * @param {string} networkId - Network ID (positive integer)
 * @param {string} tokenAddress - Ethereum token address
 * @returns {TokenMetaData} Token metadata or 404 if not found
 */
tokenRouter.get('/:networkId/:tokenAddress', [
    param('networkId')
        .isInt({gt: 0})
        .withMessage('networkId must be a positive integer'),
    param('tokenAddress')
        .isString()
        .matches(/^0x[a-f0-9]{40}$/i)
        .withMessage('Invalid Ethereum token address'),
], async (req: Request<TokenParams>, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }
    try {
        const networkId = parseInt(req.params.networkId, 10);
        const tokenAddress = req.params.tokenAddress.toLowerCase();
        const token: TokenMetaData | null = await tokenRepository.getTokenMetadata(networkId, tokenAddress);
        if (!token) {
           return  res.status(404).json({message: 'Token not found'});
        }
        return res.json(token);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return res.status(500).json({message: errorMessage});
    }
});

/**
 * @route GET /tokens/:networkId
 * @description Retrieves metadata for multiple tokens on a network
 * @param {string} networkId - Network ID (positive integer)
 * @query {string} tokens - Comma-separated list of token addresses
 * @returns {TokenMetaData[]} Array of token metadata or 404 if none found
 */
tokenRouter.get('/:networkId', [
    param('networkId')
        .isInt({gt: 0})
        .withMessage('networkId must be a positive integer'),
    query('tokens')
        .notEmpty()
        .withMessage('Query ?tokens=a,b,c is required')
        .custom((value) => {
            const tokens = value.split(',').map((t: string) => t.trim());
            return tokens.every((t: string) => /^0x[a-f0-9]{40}$/i.test(t));
        })
        .withMessage('All token addresses must be valid Ethereum addresses'),
], async (req: Request<NetworkIdParam, {}, {}, ListQuery>, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }
    try {
        const networkId = parseInt(req.params.networkId, 10);
        const tokens = req.query.tokens.split(',').map((t) => t.trim().toLowerCase());
        if (tokens.length > 100) {
            return res.status(400).json({message: 'Too many token addresses (max 100)'});
        }
        const tokensMetadata: TokenMetaData[] | null = await tokenRepository.getTokensMetadata(networkId, tokens);
        if (!tokensMetadata) {
           return  res.status(404).json({message: 'No tokens found for the given addresses'});
        }
        res.json(tokensMetadata);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return res.status(500).json({message: errorMessage});
    }
});