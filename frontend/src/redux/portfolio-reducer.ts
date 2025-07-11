import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Address} from "viem";
import {fetchTokenBalances, TokenBalancesWithMetadata} from "../api/alchemyAPI";
import fetchCoinData from "../api/navigatorDB_API";

const initialState = {
    address: undefined as Address | undefined,
    tokens: [] as Array<TokenBalancesWithMetadata>,
    nfts: [],
    spendingAllowance: []
}

const portfolioReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_TOKEN_BALANCES":
            return {
                ...state,
                tokens: action.tokensBalances
            }
        default:
            return state;
    }
}

//Action Creators
export const portfolioActions = {
    setTokensBalances: (tokensBalances: Array<TokenBalancesWithMetadata>) => ({type: "SET_TOKEN_BALANCES", tokensBalances} as const)
}

//ThunkCreators
export const getTokensInfo = (address: Address, chainId: number): ThunkType => {
    return async (dispatch) => {
        const balancesData = await fetchTokenBalances(address, chainId);

        // Remove tokens with zero balance
        const nonZeroBalances = balancesData.filter((token) => {
            return parseInt(token.tokenBalance, 16) !== 0; // replace with !==0
        });

        const tokenBalancesWithMetadata = await Promise.all(
            nonZeroBalances.map(async (token) => {
                const metadata = await fetchCoinData(token.contractAddress, chainId);

                if (!metadata) return null

                return {
                    ...token,
                    symbol: metadata?.symbol || "Unknown",
                    name: metadata?.name || "Unknown Token",
                    decimals: metadata?.decimals || 18,
                    logo: metadata?.logoURI || null,
                    price: 0,
                };
            })
        );

        //const validTokenBalancesWithMetadata = tokenBalancesWithMetadata.filter(token => token !== null);
        const validTokenBalancesWithMetadata = tokenBalancesWithMetadata.filter(
            (token): token is TokenBalancesWithMetadata => token !== null
        );

        dispatch(portfolioActions.setTokensBalances(validTokenBalancesWithMetadata));
    }
}

export default portfolioReducer;

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof portfolioActions>
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkType = BaseThunkType<ActionTypes>