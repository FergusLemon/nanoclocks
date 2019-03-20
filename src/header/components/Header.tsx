import React, { SFC } from 'react';
import '../styles/Header.css';
import logo from '../../logos/logo.svg';

const Header: SFC = ({ children }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p className="App-name">
      NanoClocks
    </p>
  </header>
)

export default Header;
