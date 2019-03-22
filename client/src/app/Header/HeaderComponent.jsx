import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Search/SearchBarContainer';
import './Header.scss';

const Header = () => {
    return (
        <header id="main-header">
            <nav>
                <h1 className="logo"><Link to="/"><span>MercadoLibre Argentina</span></Link></h1>
                <SearchBar />
            </nav>
        </header>
    );
}

export default Header;