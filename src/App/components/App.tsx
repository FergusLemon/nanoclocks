import * as React from 'react';
import logo from '../../logo.svg';
import '../styles/App.css';
import PriceInput from '../../priceInput/components/PriceInput';
import Button from '../../button/components/Button';
import Clock from '../../clock/components/Clock';
import CryptoCompareApi from '../../communications/cryptoCompareApi';
import nearestElementBinarySearch from '../../common/utils/nearestElementBinarySearch';

let bareObject: any = {};
const defaultValue: string = '';

const initialState = {
  value: defaultValue,
  min: 5,
  max: 40,
  priceHistory: bareObject,
  canGetPriceInformation: false,
  lastTime: 0
};

interface PriceData {
  high: number,
  low: number,
  open: number,
  close: number,
  time: number,
};

type State = Readonly<typeof initialState>;

class App extends React.Component<object, State> {
  readonly state: State= initialState;

  isInvalid = (value: string): boolean => {
    const regex: RegExp = /^$|^(?:0)$|^(?:0\.[0-9]{0,2})$|^(?:[1-9]{1}[0-9]{0,1})$|^(?:[1-9]{1}[0-9]{0,1}\.[0-9]{0,2})$/
    return(
      value.match(regex) === null || parseFloat(value) > this.state.max
    );
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue: string = event.currentTarget.value;
    //const formattedEventValue: string = parseFloat(eventValue).toFixed(2);
    if(this.isInvalid(eventValue)) return;
    this.setState({
      value: eventValue
    });
    this.updateCanGetPriceInformation(eventValue);
  };

  updateCanGetPriceInformation = (value: string): void => {
    if (value === "") {
      this.setState({
        canGetPriceInformation: false
      });
    } else {
      this.setState({
        canGetPriceInformation: true
      });
    }
  };

  doSearch = async (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (Object.entries(this.state.priceHistory).length > 0) return;
    this.setState({
      canGetPriceInformation: false
    });
    await CryptoCompareApi
      .getPriceInformation()
      .then(priceInformation => {
        let priceHash = this.createPriceHash(priceInformation);
        this.setState({
          priceHistory: priceHash,
          canGetPriceInformation: true
        });
        let formattedValue: string = parseFloat(this.state.value).toFixed(2);
        let timePriceLastPaid = this.getTime(formattedValue);
        this.setState({
          lastTime: timePriceLastPaid,
          value: defaultValue
        });
      })
      .catch((error) => {
        throw new Error("Something went wrong" + "........" + error);
      });
  };

  createPriceHash = (priceData: Array<PriceData>) => {
    let priceHash: any = {};
    for ( let data of priceData) {
      priceHash[data["high"]] = data["time"];
      priceHash[data["low"]] = data["time"];
      priceHash[data["open"]] = data["time"];
      priceHash[data["close"]] = data["time"];
    }
    return priceHash;
  };

  getTime = (price: string) => {
    if (this.state.priceHistory.hasOwnProperty(price)) {
      return this.state.priceHistory[price];
    } else {
      const keys = Object.keys(this.state.priceHistory);
      const comparisonFunction = (a: any, b: any) => { return a - b };
      let sortedKeys = keys.sort(comparisonFunction);
      let nearestIndex = nearestElementBinarySearch(sortedKeys, parseFloat(price));
      let nearestPrice = sortedKeys[nearestIndex];
      return this.state.priceHistory[nearestPrice];
    }
  };

  render() {
    const { value, canGetPriceInformation, lastTime } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-name">
            NanoClocks
          </p>
        </header>
        <div className="main-container">
          <div className="price">
              <PriceInput
                id="price-input-field"
                value={value}
                handleChange={this.handleInput}
                doSearch={this.doSearch}
                canGetPriceInformation={canGetPriceInformation}
              />
            </div>
            <div className="button">
              <Button
                id="price-submit-button"
                doSearch={this.doSearch}
                canGetPriceInformation={canGetPriceInformation}
              >
                {"Submit"}
              </Button>
            </div>
            { lastTime !== 0 &&
              <div className="clock">
                <Clock
                  lastTime={lastTime}/>
              </div>
            }
          </div>
      </div>
    );
  }
}

export default App;

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
