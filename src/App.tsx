import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import PriceInput from './priceInput/components/priceInput'

const initialState = {
  value: undefined
};


type State = Readonly<typeof initialState>;

class App extends React.Component<object, State> {
  readonly state: State= initialState;
  handleInput = (event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
  };
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
            handleBlur={this.handleInput}
            handleKeyDown={this.handleInput}
          />
        </div>
      </div>
    );
  }
}

export default App;
