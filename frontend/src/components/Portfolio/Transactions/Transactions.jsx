import React, { useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { ethers } from 'ethers';

const Transactions = ({ address }) => {
    const client = usePublicClient();

   /* useEffect(() => {
        const provider = new ethers.BrowserProvider(client);

        provider.getHistory(address)
            .then(transactions => {
                console.log('Transactions:', transactions);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, [address, client]);*/

    return (
        <div>
            <h2>Transactions for {address}</h2>
            {/* Здесь можно отобразить транзакции */}
        </div>
    );
};

export default Transactions;
