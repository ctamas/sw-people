import './navbar.css';
import React from 'react';
import StarsIcon from '@mui/icons-material/Stars';

function Navbar() {
    return (
        <nav className="navbar">
            <a
                className="navbar-brand"
                href="https://ctamas.github.io/sw-people/"
            >
                <StarsIcon />
                <span className='navbar-title'>Star Wars Character Search</span>
            </a>
        </nav>
    )
}
export default Navbar;
