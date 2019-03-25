import * as React from 'react'
import '../styles/PriceDisplay.css'

const defaultValue: number = 0;
const defaultStep: number = 1;
const defaultTimerInterval: number = 6000;
const defaultSymbols: Array<string> = ['₿', '$', '€', '£'];
const defaultCurrencies: Array<string> = ['BTC', 'USD', 'EUR', 'GBP'];
const initialState: any = {
  current: defaultValue,
  currencyNames: defaultCurrencies,
  symbols: defaultSymbols,
};

type State = Readonly<typeof initialState>;
type Props = {
  children: {
    'BTC': number | string
    'USD': number | string
    'EUR': number | string
    'GBP': number | string
    [name: string]: number | string
  }
}

class PriceDisplay extends React.Component<Props, State> {
  readonly state: State = initialState;

  timer: any;

  componentDidMount() {
    this.timer = setInterval(this.updatePriceToDisplay, defaultTimerInterval);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  updatePriceToDisplay = (): void => {
    this.setState(state => ({
      ...state,
      current: (state.current + defaultStep) % state.currencyNames.length,
    }));
  };

  render() {
    const { children } = this.props;
    const { current, currencyNames, symbols } = this.state;
    return (
      <div className="price-display-container">
        <p className="title">Current Price:</p>
        <ul className="price-list">
          {currencyNames.map((name: string, index: number) => (
          <li
            key={name}
            className={index === current ? name + ' display' : name + ' hide'}
          >
           {symbols[current] + children[name]  + ' ' + name}
          </li>
          ))}
        </ul>
      </div>
    )
  }
};

export default PriceDisplay
