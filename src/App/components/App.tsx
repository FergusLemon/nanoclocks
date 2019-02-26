import * as React from 'react';
import logo from '../../logo.svg';
import '../styles/App.css';
import PriceInput from '../../PriceInput/components/PriceInput'
import Button from '../../Button/components/Button'

const initialState = {
  value: "",
  min: 5,
  max: 40
};

type State = Readonly<typeof initialState>;

class App extends React.Component<object, State> {
  readonly state: State= initialState;

  isInvalid = (value: string): boolean => {
    //RegExp used for valdiating numbers entered as strings by the user, see
    //issue #2 in the Github repo for explanation outline of the issue of
    //controlled components and input fields of type number in HTML.
    //Non-capturing groups were used.
    //First RegExp group matches an empty string.
    //Second group matches a single 0.
    //Third group matches a single 0 with a decimal point
    //and then between zero and two digits that range between 0-9.
    //Fourth group matches numbers in the range 1-99.
    //Fifth group matches numbers in the same range as the fourth group but
    //includes decimal numbers up to two decimal places.
    const regex: RegExp = /^$|^(?:0)$|^(?:0\.[0-9]{0,2})$|^(?:[1-9]{1}[0-9]{0,1})$|^(?:[1-9]{1}[0-9]{0,1}\.[0-9]{0,2})$/
    return(
      value.match(regex) === null || parseFloat(value) > this.state.max
    );
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const eventValue: string = event.currentTarget.value;
    if(this.isInvalid(eventValue)) return;
    this.setState({
      value: eventValue
    })
  };

  handleClick = (event: React.MouseEvent<HTMLElement>) => {};

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
            handleChange={this.handleInput}
            handleKeyDown={this.handleInput}
          />
        </div>
        <div className="button">
          <Button
            id="price-submit-button"
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
