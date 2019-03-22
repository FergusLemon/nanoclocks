import React from 'react'
import App from '../components/App'
import '../../setupTests'
import { shallow } from 'enzyme'
import getElement from '../../common/utils/getElement'
jest.mock('../../communications/cryptoCompareApi')
jest.mock('../../common/utils/nano-price-data.json')
import mockCryptoCompareApi from '../../communications/cryptoCompareApi'


const defaultValue = "",
      MINUS = "-",
      MIN = 0.00,
      MAX = 37.62,
      ONE_DECIMAL = 5.1,
      TWO_DECIMAL = 5.10,
      THREE_DECIMAL = 5.155,
      ZERO_NUMBER = "01",
      INVALID = "Invalid",
      ONE_DOLLAR = "1.00",
      FIFTY_CENTS = "0.50",
      defaultTime = 1550880000,
      mockTime = 1660990000;

const defaultPrices = {
  BTC: MIN,
  USD: MIN,
  EUR: MIN,
  GBP: MIN,
};

const welcomeMessage: string = `Welcome to NanoClocks, the site that lets you
see how long it has been since NANO traded at a given price in $USD.`;

const setup = (input = {}) => (
  {
    value: input.value || defaultValue,
    canGetPriceInformation: input.canGetPriceInformation || false,
    lastTime: input.lastTime || defaultTime,
    nearestPrice: input.nearestPrice || defaultValue
  }
);

const data = [{
        "high": ONE_DOLLAR,
        "low": ONE_DOLLAR,
        "time": defaultTime,
      },
      {
        "high": FIFTY_CENTS,
        "low": FIFTY_CENTS,
        "time": mockTime,
      }];

describe("App", () => {

  beforeAll(() => {
    mockCryptoCompareApi.getCurrentPrice.mockImplementation(() =>
        new Promise(resolve => resolve(defaultPrices)));
    mockCryptoCompareApi.getPriceInformation.mockImplementation(() =>
        new Promise(resolve => resolve(data)));
  });

  afterAll(() => {
    mockCryptoCompareApi.getCurrentPrice.mockClear();
    mockCryptoCompareApi.getPriceInformation.mockClear();
  });

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('passes the message on state to the Message component', () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find('Message').props().children).toBe(welcomeMessage);
  });

  it(`does not render the Clock component if the value of lastTime on state is
    zero`, () => {
      const wrapper = shallow(<App />);

      expect(wrapper.exists('.clock')).toEqual(false);
  });

  it(`renders the Clock component if the value of lastTime on state is not
    zero`, () => {
      const wrapper = shallow(<App />);

      wrapper.setState({ lastTime: defaultTime });

      expect(wrapper.exists('.clock')).toEqual(true);
  });

  it(`does not render the Price Input, Button or Price Display components if
    the value of the canRender property on state is set to false`, () => {
      const wrapper = shallow(<App />);

      wrapper.setState({canRender: false});

      expect(wrapper.exists('.price')).toEqual(false);
      expect(wrapper.exists('.button')).toEqual(false);
      expect(wrapper.exists('.current-price-container')).toEqual(false);
  });

  it('passes the value on state to the PriceInput component', () => {
    const wrapper = shallow(<App/>);

    wrapper.setState({canRender: true});

    expect(wrapper.find('PriceInput').props().value).toBe(defaultValue);
  });

  it(`passes canGetPriceInformation off state to the PriceInput component and
    the Button component`, () => {
    const testEnv = setup({ canGetPriceInformation: false });
    const wrapper = shallow(<App {...testEnv} />);

    wrapper.setState({canRender: true});

      expect(wrapper.find('PriceInput').props().canGetPriceInformation)
        .toEqual(false);
      expect(wrapper.find('Button').props().canGetPriceInformation)
        .toEqual(false);
  });

  it('passes the userPrice on state to the Clock component', () => {
    const wrapper = shallow(<App/>);
    wrapper.setState({ lastTime: defaultTime, userPrice: defaultValue });

    expect(wrapper.find('Clock').props().userPrice).toBe(defaultValue);
  });

  it('passes the nearestPrice on state to the Clock component', () => {
    const wrapper = shallow(<App/>);
    wrapper.setState({ lastTime: defaultTime, nearestPrice: MIN.toString() });

    expect(wrapper.find('Clock').props().nearestPrice)
      .toBe(wrapper.state().nearestPrice);
  });

  it('passes the lastTime on state to the Clock component', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({lastTime: defaultTime});

    expect(wrapper.find('Clock').props().lastTime).toEqual(defaultTime);
  });

  it('passes the currentPrices on state to the PriceDisplay component', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({currentPrices: defaultPrices, canRender: true});

    expect(wrapper.find('PriceDisplay').props().children).toEqual(defaultPrices);
  });

  describe('Setting the value property on state', () => {
    let wrapper, event;
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({
        value: defaultValue,
        canRender: true,
      });
      event = {
        currentTarget: {
          value: defaultValue
        }
      };
    });

    describe('when the price entered by the user is valid', () => {
      it('sets the value on state', () => {
        let validAmount = MIN.toString();
        event.currentTarget.value = validAmount;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(validAmount);
      });

      xit('sets the value on state to two decimal places', () => {
        let validAmount = ONE_DECIMAL.toString();
        event.currentTarget.value = validAmount;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(TWO_DECIMAL.toFixed(2));
      });

      it(`sets the value on state of a two digit number where the first digit
        is less than the minimum`, () => {
          let validAmount = (MIN + 30).toString();
          event.currentTarget.value = validAmount;

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(validAmount);
      });

      it('sets the value on state of a number with one decimal place', () => {
        let validAmountOneDecimal = ONE_DECIMAL.toString();
        event.currentTarget.value = validAmountOneDecimal;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(validAmountOneDecimal);
      });

      it('sets the value on state of a number with two decimal places', () => {
        let validAmountTwoDecimal = TWO_DECIMAL.toString();
        event.currentTarget.value = validAmountTwoDecimal;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(validAmountTwoDecimal);
      });
    });

    describe('when the price entered by the user is invalid', () => {
      it(`does not set the value on state when a number has more than two
        decimal places`, () => {
          let validAmountThreeDecimal = THREE_DECIMAL.toString();
          event.currentTarget.value = validAmountThreeDecimal;

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(defaultValue);
      });

      it(`does not set the value on state when the leading digit is
        a zero`, () => {
          event.currentTarget.value = ZERO_NUMBER;

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(defaultValue);
      });

      it(`does not set the value on state when the leading character is a
        minus sign`, () => {
          event.currentTarget.value = MINUS;

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(defaultValue);
      });

      it(`does not set the value on state when there is a non-numeric
        character`, () => {
          event.currentTarget.value = INVALID;

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(defaultValue);
      });

      it(`does not set the value on state when a number is less than
        the minimum`, () => {
          let underLimit = MIN - 1;
          event.currentTarget.value = underLimit.toString();

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(defaultValue);
      });

      it(`does not set the value on state when a number is more than
        the maximum`, () => {
          let overLimit = MAX + 1;
          event.currentTarget.value = overLimit.toString();

          wrapper.find("PriceInput").props().handleChange(event);

          expect(wrapper.state().value).toBe(defaultValue);
      });
    });
  });

  describe("Calling the CryptoCompare API", () => {
    let wrapper;
    beforeEach(() => {
      mockCryptoCompareApi.getCurrentPrice.mockClear();
      mockCryptoCompareApi.getPriceInformation.mockClear();
      wrapper = shallow(<App />);
      wrapper.setState({ canRender: true });
    });

    it(`getCurrentPrice should have been called in componentDidMount`,
      () => {
        expect(mockCryptoCompareApi.getCurrentPrice).toHaveBeenCalledTimes(1);
    });

    it(`sets currentPrices on state to the resolved promise from calling
      getCurrentPrices`, async () => {
        await wrapper.instance().componentDidMount();
        expect(wrapper.state().currentPrices).toBe(defaultPrices);
    });

    it(`getPriceInformation should have been called in componentDidMount`,
      () => {
        expect(mockCryptoCompareApi.getPriceInformation).toHaveBeenCalledTimes(1);
    });

    it(`should not be called when a user searches for a price`, () => {
      wrapper.find('PriceInput').props().doSearch();
      expect(mockCryptoCompareApi.getPriceInformation).not.toHaveBeenCalledOnce;
    });
  });

  describe('Searching for a price', () => {
    let wrapper, event;
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({ canRender: true });
      event = {
        currentTarget: {
          value: defaultValue,
        }
      };
    });

    it(`should supply the time associated with the searched for price to the
      lastTime property of state when doSearch is called`, () => {
      event.currentTarget.value = FIFTY_CENTS;

      wrapper.find('PriceInput').props().handleChange(event);
      wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().lastTime).toEqual(mockTime);
    });

    it(`should set the userPrice on state to the value entered by
      the user`, () => {
        wrapper.setState({ value: ONE_DOLLAR });

        wrapper.find('PriceInput').props().doSearch();

        expect(wrapper.state().userPrice).toEqual(ONE_DOLLAR);
    });

    it(`should reset the value on state back to the default value`, () => {
      wrapper.setState({ value: ONE_DOLLAR });

      wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().value).toEqual(defaultValue);
    });
  });

  describe('Enabling and disabling the search functionality', () => {
    let wrapper, event, validAmount;
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({ canRender: true });
      event = {
        currentTarget: {
          value: defaultValue
        }
      };
      validAmount = MAX.toString();
    });

    it(`sets canGetPriceInformation to false when the price input field is
      empty`, () => {
        wrapper.find('PriceInput').props().handleChange(event);

        expect(wrapper.state().canGetPriceInformation).toEqual(false);
    });

    it(`sets canGetPriceInformation to true when the price input field contains
      a valid price`, () => {
        event.currentTarget.value = validAmount;

        wrapper.find('PriceInput').props().handleChange(event);

        expect(wrapper.state().canGetPriceInformation).toEqual(true);
    });

    xit(`sets canGetPriceInformation to false before the doSearch Promise fires`,
      () => {
        event.currentTarget.value = validAmount;

        wrapper.find('PriceInput').props().handleChange(event);
        wrapper.find('PriceInput').props().doSearch();

        expect(wrapper.state().canGetPriceInformation).toEqual(false);
    });

    it(`should allow a user to continue searching for new prices`, () => {
      wrapper.setState({
        value: defaultValue,
        priceHistory: { "0.50": defaultTime, "2.00": defaultTime },
        userPrice: defaultValue,
      });

      event.currentTarget.value = validAmount;
      wrapper.find('PriceInput').props().handleChange(event);
      wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().userPrice).toEqual(validAmount);
      expect(wrapper.find('Clock').props().userPrice).toEqual(validAmount);
    });
  });

  describe('finding the last time a price was paid', () => {
    let wrapper, event
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({ canRender: true });
      event = {
        currentTarget: {
          value: ONE_DOLLAR
        }
      };
    });

    describe(`when the price entered by the user is in the priceHistory
      hash`, () => {
        it('returns the value of that price as Unix time', () => {
          wrapper.find('PriceInput').props().handleChange(event);
          wrapper.find('PriceInput').props().doSearch();

          expect(wrapper.state().lastTime).toEqual(defaultTime);
          expect(wrapper.state().nearestPrice).toEqual(defaultValue);
      });
    });

    describe(`when the price entered by the user is not in the priceHistory
      hash`, () => {
        it('returns the value of the next highest price as Unix time', () => {
          const userPrice = "0.99";
          event.currentTarget.value = userPrice;

          wrapper.find('PriceInput').props().handleChange(event);
          wrapper.find('PriceInput').props().doSearch();

          expect(wrapper.state().lastTime).toEqual(defaultTime);
          expect(wrapper.state().lastTime).not.toEqual(mockTime);
          expect(wrapper.state().nearestPrice).toEqual(ONE_DOLLAR);
      });
    });
  });
});
