import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PriceInput from './priceInput/components/priceInput'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-name">
            NanoClocks
          </p>
        </header>
        <div className="price">
          <PriceInput
            id="price-input-field"
          />
        </div>
      </div>
    );
  }
}

export default App;
