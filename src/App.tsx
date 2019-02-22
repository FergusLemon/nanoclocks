import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PriceInput from './priceInput/components/priceInput'

const initialState = {
  value: undefined
};

type State = Readonly<typeof initialState>;

class App extends Component<object, State> {
  readonly state: State= initialState;
  render() {
    const { value } = this.state;
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
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default App;
