import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";



const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/Portfolio"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}> Portfolio
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Swap"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}> Swap
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Bridge"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}> Bridge
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Settings"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}> Settings
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;