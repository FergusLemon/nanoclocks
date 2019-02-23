import * as React from 'react';
import logo from '../../logo.svg';
import '../styles/App.css';
import PriceInput from '../../priceInput/components/priceInput'

const initialState = {
  value: "",
  min: 5,
  max: 40,
  step: 0.05
};

type State = Readonly<typeof initialState>;

class App extends React.Component<object, State> {
  readonly state: State= initialState;

  isNotValid = (value: string | number): boolean => {
    return(value === "-" || value < this.state.min || value > this.state.max);
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const eventValue: string | number = event.currentTarget.value;
    if(this.isNotValid(eventValue)) return;
    this.setState({
      value: eventValue
    })
  };

  render() {
    const { value, min, max, step } = this.state;
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
            min={min}
            max={max}
            step={step}
            handleChange={this.handleInput}
            handleKeyDown={this.handleInput}
          />
        </div>
      </div>
    );
  }
}

export default App;
