import React from 'react';
import styles from './Header.module.css';
import logo from '../../images/logo.webp'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = (props) => {

    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo" />
            <h1 className={styles.headerTitle}> Crypto Navigator </h1>
            <div className={styles.loginBlock}>
                <ConnectButton />
            </div>
        </header>
    )
}

export default Header;


