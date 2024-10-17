import React, { useState } from 'react';
import account_logo from "../../images/account.png";
import { useAccount } from 'wagmi';
import styles from './PortfolioPage.module.css';
import TokensPage from "./Tokens/TokensPage";
import NFTsPage from "./NFTs/NFTsPage";
import TransactionsPage from "./Transactions/TransactionsPage";
import SpendingPage from "./Spending/SpendingPage";

const PortfolioPage = () => {
    const { address } = useAccount();

    // An array of sections that includes the button title and page component.
    const sections = [
        { name: 'Tokens', component: <TokensPage /> },
        { name: 'NFTs', component: <NFTsPage /> },
        { name: 'Transactions', component: <TransactionsPage /> },
        { name: 'Spending', component: <SpendingPage /> },
    ];

    const [activeSection, setActiveSection] = useState(sections[0].name);

    const ActiveComponent = sections.find(section => section.name === activeSection)?.component;

    if (!address) {
        return (
            <div className={styles.container}>
                <p>Connect your wallet first</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.accountHeader}>
                <div className={styles.accountTitle}>Account:</div>
                <div className={styles.accountInfo}>
                    <img src={account_logo} alt="Default account logo" className={styles.accountLogo} />
                    <a className={styles.accountAddress}>{address}</a>
                </div>
            </div>

            <div className={styles.navBar}>
                {sections.map((section) => (
                    <button
                        key={section.name}
                        className={`${styles.navButton} ${
                            activeSection === section.name ? styles.navButtonActive : ''
                        }`}
                        onClick={() => setActiveSection(section.name)}
                    >
                        {section.name}
                    </button>
                ))}
            </div>

            {/* Dynamic page display */}
            <div className={styles.content}>
                {ActiveComponent}
            </div>
        </div>
    );
};

export default PortfolioPage;
