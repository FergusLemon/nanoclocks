import React from 'react';
import App from '../components/App';
import '../../setupTests';
import { shallow } from 'enzyme';
import getElement from '../../common/utils/getElement';
jest.mock('../../communications/cryptoCompareApi');
import mockCryptoCompareApi from '../../communications/cryptoCompareApi';

const defaultValue = "",
      MINUS = "-",
      MIN = 5.00,
      MAX = 40.00,
      ONE_DECIMAL = 5.1,
      TWO_DECIMAL = 5.10,
      THREE_DECIMAL = 5.155,
      ZERO_NUMBER = "01",
      INVALID = "Invalid",
      DEFAULT_TIME = 1550880000;
const setup = (input = {}) => (
  {
    value: input.value || defaultValue,
    canGetPriceInformation: input.canGetPriceInformation || false,
    lastTime: input.lastTime || DEFAULT_TIME
  }
);

describe("App", () => {

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('does not render the Clock component if the value of lastTime on state is zero', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists('.clock')).toEqual(false);
  });

  it('renders the Clock component if the value of lastTime on state is not zero', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ lastTime: DEFAULT_TIME });

    expect(wrapper.exists('.clock')).toEqual(true);
  });

  it('passes the value on state to the PriceInput component', () => {
    const testEnv = setup({ value: defaultValue });
    const wrapper = shallow(<App {...testEnv} />);

    expect(wrapper.find('PriceInput').props().value).toBe(testEnv.value);
  });

  it('passes the lastTime on state to the Clock component', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({lastTime: DEFAULT_TIME});

    expect(wrapper.find('Clock').props().lastTime).toEqual(DEFAULT_TIME);
  });

  describe('Setting value property on state', () => {
    let wrapper, event;
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({
        value: defaultValue
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

      it('sets the value on state of a two digit number where the first digit is less than the minimum', () => {
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
      it('does not set the value on state when a number has more than two decimal places', () => {
        let validAmountThreeDecimal = THREE_DECIMAL.toString();
        event.currentTarget.value = validAmountThreeDecimal;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(defaultValue);
      });

      it('does not set the value on state when the leading digit is a zero', () => {
        event.currentTarget.value = ZERO_NUMBER;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(defaultValue);
      });

      it('does not set the value on state when the leading character is a minus sign', () => {
        event.currentTarget.value = MINUS;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(defaultValue);
      });

      it('does not set the value on state when there is a non-numeric character', () => {
        event.currentTarget.value = INVALID;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(defaultValue);
      });

      xit('does not set the value on state when a number is less than the minimum', () => {
        let underLimit = MIN - 1;
        event.currentTarget.value = underLimit.toString();

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(defaultValue);
      });

      it('does not set the value on state when a number is more than the maximum', () => {
        let overLimit = MAX + 1;
        event.currentTarget.value = overLimit.toString();

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(defaultValue);
      });
    });
  });

  describe("Calling the CryptoCompare API", () => {
    let wrapper, data;
    beforeEach(() => {
      wrapper = shallow(<App />);
      data = [{
        "high": 0.9351,
        "low": 0.9014,
        "open": 0.91,
        "close": 0.92,
        "time": 1550620800,
      }];
      mockCryptoCompareApi.getPriceInformation.mockClear();
    });

    it('should supply the time to the time property of state when doSearch is called by the PriceInput', async () => {
      const high = data[0]["high"];
      const time = data[0]["time"];
      mockCryptoCompareApi.getPriceInformation.mockImplementationOnce(() =>
        new Promise(resolve => resolve(data)));

      await wrapper.find('PriceInput').props().doSearch();
      let priceHistoryObj = wrapper.state().priceHistory;

      expect(priceHistoryObj[high]).toEqual(time);
      expect(Object.keys(priceHistoryObj).length).toEqual(4);
      expect(mockCryptoCompareApi.getPriceInformation).toHaveBeenCalledOnce;
    });

    it('should not be called if a user has already made a call and a promise has resolved', async () => {
      mockCryptoCompareApi.getPriceInformation.mockImplementation(() =>
        new Promise(resolve => resolve(data)));

      await wrapper.find('PriceInput').props().doSearch();
      await wrapper.find('PriceInput').props().doSearch();

      expect(mockCryptoCompareApi.getPriceInformation).toHaveBeenCalledTimes(1);
      expect(mockCryptoCompareApi.getPriceInformation).not.toHaveBeenCalledTimes(2);
    });

    it(`should reset the value on state back to the default value`, async () => {
      mockCryptoCompareApi.getPriceInformation.mockImplementation(() =>
        new Promise(resolve => resolve(data)));

      let value = MIN.toString();
      wrapper.setState({ value: value });
      await wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().value).toEqual(defaultValue);
    });

    xit('passes canGetPriceInformation off state to the PriceInput component and the Button component', () => {
      const testEnv = setup({ canGetPriceInformation: false });
      const wrapper = shallow(<App {...testEnv} />);

      expect(wrapper.find('PriceInput').props().canGetPriceInformation).toBeDefined;
      expect(wrapper.find('PriceInput').props().canGetPriceInformation).toEqual(false);
    });
  });

  describe('Enabling and disabling calls to the Crypto Compare API', () => {
    let wrapper, event;
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({
        value: defaultValue,
        canGetPriceInformation: false
      });
      event = {
        currentTarget: {
          value: defaultValue
        }
      };
    });

    it('sets canGetPriceInformation to false when the price input field is empty', () => {
      const wrapper = shallow(<App />);

      wrapper.find('PriceInput').props().handleChange(event);

      expect(wrapper.state().canGetPriceInformation).toEqual(false);
    });

    it('sets canGetPriceInformation to true when the price input field contains a valid price', () => {
      let validAmount = MAX.toString();
      event.currentTarget.value = validAmount;

      wrapper.find('PriceInput').props().handleChange(event);

      expect(wrapper.state().canGetPriceInformation).toEqual(true);
    });

    it('sets canGetPriceInformation to false before the doSearch Promise fires', () => {
      let validAmount = MAX.toString();
      event.currentTarget.value = validAmount;

      wrapper.find('PriceInput').props().handleChange(event);
      wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().canGetPriceInformation).toEqual(false);
    });

    it('sets canGetPriceInformation to true after the doSearch Promise fires', async() => {
      let data = [];
      let validAmount = MAX.toString();
      event.currentTarget.value = validAmount;

      wrapper.find('PriceInput').props().handleChange(event);
      mockCryptoCompareApi.getPriceInformation.mockImplementationOnce(() =>
        new Promise(resolve => resolve(data)));
      await wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().canGetPriceInformation).toEqual(true);
    });
  });

  describe('finding the last time a price was paid', () => {
    let wrapper, lowPrice, highPrice, lowTime, highTime, data, event
    beforeEach(() => {
      wrapper = shallow(<App />);
      highPrice = "1.00";
      highTime = DEFAULT_TIME;
      lowPrice = "0.50";
      lowTime = 1660770000;
      data = [
        { time: highTime, high: highPrice, low: highPrice, open: highPrice, close: highPrice },
        { time: lowTime, high: lowPrice, low: lowPrice, open: lowPrice, close: lowPrice },
      ];
      event = {
        currentTarget: {
          value: highPrice
        }
      };
    });

    describe('when the price entered by the user is in the priceHistory hash', () => {
      it('returns the value of that price as Unix time', async() => {
        wrapper.find('PriceInput').props().handleChange(event);
        mockCryptoCompareApi.getPriceInformation.mockImplementationOnce(() =>
          new Promise(resolve => resolve(data)));
        await wrapper.find('PriceInput').props().doSearch();

        expect(wrapper.state().lastTime).toEqual(highTime);
      });
    });

    describe('when the price entered by the user is not in the priceHistory hash', () => {
      it('returns the value of the next highest price as Unix time', async() => {
        const userPrice = "0.99";
        event.currentTarget.value = userPrice;

        wrapper.find('PriceInput').props().handleChange(event);
        mockCryptoCompareApi.getPriceInformation.mockImplementationOnce(() =>
          new Promise(resolve => resolve(data)));
        await wrapper.find('PriceInput').props().doSearch();

        expect(wrapper.state().lastTime).toEqual(highTime);
        expect(wrapper.state().lastTime).not.toEqual(lowTime);
      });
    });
  });
});
