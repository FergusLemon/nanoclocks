import * as React from 'react'
import '../styles/App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Header from '../../header/components/Header'
import Message from '../../message/components/Message'
import PriceDisplay from '../../priceDisplay/components/PriceDisplay'
import PriceInput from '../../priceInput/components/PriceInput'
import Button from '../../button/components/Button'
import Clock from '../../clock/components/Clock'
import Footer from '../../footer/components/Footer'
import CryptoCompareApi from '../../communications/cryptoCompareApi'
import nearestElementBinarySearch from '../../common/utils/nearestElementBinarySearch'
import validNumberRegex from '../../common/utils/validNumberRegex'
import rangeFiller from '../../common/utils/rangeFiller'
import priceData2017 from '../../common/utils/nano-price-data.json'

library.add(fab);
let bareObject: any = {};
const defaultValue: string = '';
const defaultTime: number = 0;
const defaultMessage: string = `Welcome to NanoClocks, the site that lets you
see how long it has been since NANO traded at a given price in $USD.`;

const initialState = {
  welcomeMessage: defaultMessage,
  value: defaultValue,
  min: 0.00,
  max: 37.62,
  currentPrices: bareObject,
  priceHistory: bareObject,
  canRender: false,
  canGetPriceInformation: false,
  userPrice: defaultValue,
  nearestPrice: defaultValue,
  lastTime: defaultTime
};

interface PriceData {
  high: number,
  low: number,
  time: number,
};

type State = Readonly<typeof initialState>;

class App extends React.Component<object, State> {
  readonly state: State= initialState;

  isInvalid = (value: string): boolean => {
    return(
      value.match(validNumberRegex) === null || parseFloat(value) > this.state.max
    );
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue: string = event.currentTarget.value;
    if(this.isInvalid(eventValue)) return;
    this.setState(this.updateValue(eventValue));
    this.updateCanGetPriceInformation(eventValue);
  };

  updateCanGetPriceInformation = (value: string): void => {
    if (value === "") {
      this.setState(this.setSearchability(false));
    } else {
      this.setState(this.setSearchability(true));
    }
  };

  setSearchability = (bool: boolean): object => {
    return (previousState: State, currentProps: object) => {
      return { ...previousState, canGetPriceInformation: bool };
    };
  };

  doSearch = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    this.setState(this.setSearchability(false));
    this.setState(this.updateUserPrice());
    let formattedValue: string = parseFloat(this.state.value).toFixed(2);
    let timePriceLastPaid = this.getTime(formattedValue);
    this.setState(this.updateTime(timePriceLastPaid));
    this.setState(this.updateValue(defaultValue));
  };

  updateUserPrice = (): object => {
    return (previousState: State, currentProps: object) => {
      return { ...previousState, userPrice: previousState.value };
    };
  };

  updateTime = (time: number): object => {
    return (previousState: State, currentProps: object) => {
      return { ...previousState, lastTime: time };
    };
  };

  updateValue = (value: string): object => {
    return (previousState: State, currentProps: object) => {
      return { ...previousState, value: value };
    };
  };

  getTime = (price: string) => {
    if (this.state.priceHistory.hasOwnProperty(price)) {
      this.setState(this.updateNearestPrice(defaultValue));
      return this.state.priceHistory[price];
    } else {
      const keys = Object.keys(this.state.priceHistory);
      const comparisonFunction = (a: any, b: any) => { return a - b };
      let sortedKeys = keys.sort(comparisonFunction);
      let nearestIndex = nearestElementBinarySearch(sortedKeys, parseFloat(price));
      let nearestPrice = sortedKeys[nearestIndex];
      this.setState(this.updateNearestPrice(nearestPrice));
      return this.state.priceHistory[nearestPrice];
    }
  };

  updateNearestPrice = (price: string): object => {
    return (previousState: State, currentProps: object) => {
      return { ...previousState, nearestPrice: price };
    };
  };

  async componentDidMount () {
    let formattedData = priceData2017.map((data: any) => {
      let requiredData = {
        time: parseInt(data["time"]),
        high: parseFloat(data["high"]),
        low: parseFloat(data["low"]),
      }
      return requiredData;
    });
    let priceHash2017 = this.createPriceHash(formattedData);

    await CryptoCompareApi
      .getPriceInformation()
      .then(priceInformation => {
        let priceHashToNow = this.createPriceHash(priceInformation);
        let combinedPriceHash = Object.assign(priceHash2017, priceHashToNow)
        this.setState({
          priceHistory: combinedPriceHash,
          canRender: true,
        });
      })
      .catch((error) => {
        throw new Error("Something went wrong" + "........" + error);
      });

    await CryptoCompareApi
      .getCurrentPrice()
      .then(currentPrices => {
        this.setState({
          currentPrices: currentPrices
        });
      })
      .catch((error) => {
        throw new Error("Something went wrong" + "........" + error);
      });
  };

  createPriceHash = (priceData: Array<PriceData>) => {
    let priceHash: any = {};
    for ( let data of priceData) {
      if(data["low"] === data["high"]) {
        priceHash[data["low"]] = data["time"];
      } else {
        let range: Array<string> = rangeFiller(data["low"], data["high"]);
        for(let price of range) {
          priceHash[price] = data["time"];
        }
      }
    }
    return priceHash;
  };

  render() {
    const { welcomeMessage, value, canRender, canGetPriceInformation, lastTime,
      userPrice, nearestPrice, currentPrices } = this.state;
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <div className="current-price-container">
          <PriceDisplay>
            {currentPrices}
          </PriceDisplay>
        </div>
        <div className="main-container">
          <div className="message">
            <Message>
              {welcomeMessage}
            </Message>
          </div>
          { canRender &&
            <div className="price">
              <PriceInput
                id="price-input-field"
                value={value}
                handleChange={this.handleInput}
                doSearch={this.doSearch}
                canGetPriceInformation={canGetPriceInformation}
              />
            </div>
          }
          { canRender &&
            <div className="button">
              <Button
                id="price-submit-button"
                doSearch={this.doSearch}
                canGetPriceInformation={canGetPriceInformation}
              >
                {"Submit"}
              </Button>
            </div>
          }
            { lastTime !== 0 &&
              <div className="clock">
                <Clock
                  lastTime={lastTime}
                  userPrice={userPrice}
                  nearestPrice={nearestPrice}
                />
              </div>
            }
          </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App
