import { useAccount } from 'wagmi';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { formatBalance } from "../../../utils/helpers";
import { getTokensInfo } from "../../../redux/portfolio-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getTokensInfoSelector } from "../../../redux/selectors/portfolio-selectors";
import { AppDispatch } from "../../../redux/redux-store";

const TokensPage: React.FC = () => {
    const { address, chain } = useAccount();
    const tokenBalances = useSelector(getTokensInfoSelector);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const loadTokenBalances = useCallback(async () => {
        if (!address || !chain) return;

        setIsLoading(true);
        setError(null);

        try {
            dispatch(getTokensInfo(address, chain.id));
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to load token balances: ${error.message}`);
            } else {
                setError('Failed to load token balances due to an unknown error.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [address, chain, dispatch]);

    useEffect(() => {
        loadTokenBalances();
    }, [loadTokenBalances]);

    const calculateTotalValue = (tokenBalances: any[]) => {
        return tokenBalances.reduce((total, token) => {
            const tokenValue = parseFloat(formatBalance(token.tokenBalance, token.decimals)) * token.price;
            return total + tokenValue;
        }, 0);
    };

    const renderTokenBalances = useMemo(() => {
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        if (!Array.isArray(tokenBalances) || tokenBalances.length === 0) {
            return <div>No tokens available.</div>;
        }

        const totalValue = calculateTotalValue(tokenBalances);

        return (
            <div style={styles.container}>
                <div style={styles.header}>Assets €{totalValue.toFixed(2)}</div>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.headerCell}>Name</th>
                        <th style={styles.headerCell}>Amount</th>
                        <th style={styles.headerCell}>Price</th>
                        <th style={styles.headerCell}>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tokenBalances.map((token) => {
                        const tokenAmount = parseFloat(formatBalance(token.tokenBalance, token.decimals));
                        const tokenTotal = tokenAmount * token.price;

                        return (
                            <tr key={token.contractAddress} style={styles.row}>
                                <td style={styles.nameCell}>
                                    <img
                                        src={token.logo || "/placeholder.png"}
                                        alt={`${token.symbol} logo`}
                                        style={styles.tokenImage}
                                    />
                                    <div>
                                        <div>{token.name}</div>
                                        <div style={styles.symbol}>{token.symbol}</div>
                                    </div>
                                </td>
                                <td style={styles.cell}>{tokenAmount}</td>
                                <td style={styles.cell}>€{token.price.toFixed(5)}</td>
                                <td style={styles.cell}>€{tokenTotal.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }, [isLoading, error, tokenBalances]);

    return (
        <div style={styles.pageContainer}>
            {renderTokenBalances}
        </div>
    );
}

export default TokensPage;

const styles = {
    pageContainer: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box' as 'border-box',
    },
    container: {
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        boxSizing: 'border-box' as 'border-box',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as 'collapse',
    },
    headerRow: {
        textAlign: 'left' as 'left',
        borderBottom: '2px solid #ddd',
    },
    headerCell: {
        padding: '10px 0',
    },
    row: {
        borderBottom: '1px solid #ddd',
    },
    nameCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
    },
    tokenImage: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
    },
    symbol: {
        color: '#888',
    },
    cell: {
        padding: '10px 0',
    },

    // Media queries for responsive design
    '@media (max-width: 768px)': {
        header: {
            fontSize: '20px',
        },
        table: {
            display: 'block',
            width: '100%',
        },
        headerRow: {
            display: 'none',
        },
        row: {
            display: 'block',
            marginBottom: '10px',
        },
        nameCell: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
        },
        cell: {
            display: 'block',
            width: '100%',
            textAlign: 'right',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#fff',
        },
    },
};
