import React from "react";
import Transactions from "./Transactions";
import {useAccount} from "wagmi";

const TransactionsPage = (props) => {
    const { address } = useAccount();

    return(
        <div>
            <Transactions address={address}/>
        </div>
    )
}

export default TransactionsPage;