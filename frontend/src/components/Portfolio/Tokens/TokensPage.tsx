import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react';
import { useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';

import { formatBalance } from '../../../utils/helpers';
import { getTokensInfo } from '../../../redux/portfolio-reducer';
import { getTokensInfoSelector } from '../../../redux/selectors/portfolio-selectors';
import { AppDispatch } from '../../../redux/redux-store';
import styles from './TokensPage.module.css';

const TokensPage: React.FC = () => {
    const { address, chain } = useAccount();
    const tokenBalances = useSelector(getTokensInfoSelector);
    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setIsLoading] = useState(true);
    const [error,     setError]     = useState<string | null>(null);

    const loadTokenBalances = useCallback(async () => {
        if (!address || !chain) return;

        setIsLoading(true);
        setError(null);

        try {
            await dispatch(getTokensInfo(address, chain.id));
        } catch (e) {
            setError(
                e instanceof Error
                    ? `Failed to load token balances: ${e.message}`
                    : 'Failed to load token balances due to an unknown error.',
            );
        } finally {
            setIsLoading(false);
        }
    }, [address, chain, dispatch]);

    useEffect(() => {
        loadTokenBalances();
    }, [loadTokenBalances]);

    const calculateTotalValue = (tokens: any[]) =>
        tokens.reduce((sum, t) => {
            const amount = parseFloat(formatBalance(t.tokenBalance, t.decimals));
            return sum + amount * t.price;
        }, 0);

    const renderTokenBalances = useMemo(() => {
        if (isLoading) return <div>Loading…</div>;
        if (error)     return <div>Error: {error}</div>;

        if (!Array.isArray(tokenBalances) || tokenBalances.length === 0) {
            return <div>No tokens available.</div>;
        }

        const totalValue = calculateTotalValue(tokenBalances);

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    Assets €{totalValue.toFixed(2)}
                </div>

                <table className={styles.table}>
                    <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerCell}>Name</th>
                        <th className={styles.headerCell}>Amount</th>
                        <th className={styles.headerCell}>Price</th>
                        <th className={styles.headerCell}>Total</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tokenBalances.map((token) => {
                        const amount = parseFloat(
                            formatBalance(token.tokenBalance, token.decimals),
                        );
                        const total  = amount * token.price;

                        return (
                            <tr key={token.contractAddress} className={styles.row}>
                                <td className={styles.nameCell}>
                                    <img
                                        src={token.logo || '/placeholder.png'}
                                        alt={`${token.symbol} logo`}
                                        className={styles.tokenImage}
                                    />
                                    <div>
                                        <div>{token.name}</div>
                                        <div className={styles.symbol}>{token.symbol}</div>
                                    </div>
                                </td>
                                <td className={styles.cell}>{amount}</td>
                                <td className={styles.cell}>€{token.price.toFixed(5)}</td>
                                <td className={styles.cell}>€{total.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }, [isLoading, error, tokenBalances]);


    return (
        <div className={styles.pageContainer}>
            {renderTokenBalances}
        </div>
    );
};

export default TokensPage;
