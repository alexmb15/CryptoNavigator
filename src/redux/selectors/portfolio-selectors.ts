import { createSelector } from 'reselect';
import { AppStateType } from "../redux-store";

// Basic selector to access the tokensPage part of the state
const selectTokensPage = (state: AppStateType) => state.tokensPage;

// Selector to retrieve the tokens array with default fallback to an empty array
export const getTokensInfoSelector = createSelector(
    [selectTokensPage],
    (tokensPage) => tokensPage?.tokens || []
);
