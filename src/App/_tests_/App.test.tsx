import React from 'react';
import App from '../components/App';
import '../../setupTests';
import { shallow } from 'enzyme';
import getElement from '../../common/utils/getElement';
jest.mock('../../communications/cryptoCompareApi');
import mockCryptoCompareApi from '../../communications/cryptoCompareApi';

const DEFAULT_VALUE = "",
      MINUS = "-",
      MIN = 5.00,
      MAX = 40.00,
      ONE_DECIMAL = 5.1,
      TWO_DECIMAL = 5.10,
      THREE_DECIMAL = 5.155,
      ZERO_NUMBER = "01",
      INVALID = "Invalid";
const setup = (input = {}) => (
  {
    value: input.value || DEFAULT_VALUE,
    canGetPriceInformation: input.canGetPriceInformation || false
  }
);

describe("App", () => {

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('passes the value on state to the PriceInput component', () => {
    const testEnv = setup({ value: DEFAULT_VALUE });
    const wrapper = shallow(<App {...testEnv} />);

    expect(wrapper.find('PriceInput').props().value).toBe(testEnv.value);
  });

  describe('Setting value property on state', () => {
    let wrapper, event;
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({
        value: DEFAULT_VALUE
      });
      event = {
        currentTarget: {
          value: DEFAULT_VALUE
        }
      };
    });

    describe('when the price entered by the user is valid', () => {
      it('sets the value on state', () => {
        let validAmount = MIN.toString();
        let formattedAmount = parseFloat(validAmount).toFixed(2);
        event.currentTarget.value = validAmount;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(formattedAmount);
      });

      it('sets the value on state to two decimal places', () => {
        let validAmount = ONE_DECIMAL.toString();
        event.currentTarget.value = validAmount;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(TWO_DECIMAL.toFixed(2));
      });

      it('sets the value on state of a two digit number where the first digit is less than the minimum', () => {
        let validAmount = (MIN + 30).toString();
        let formattedAmount = parseFloat(validAmount).toFixed(2);
        event.currentTarget.value = validAmount;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(formattedAmount);
      });

      it('sets the value on state of a number with one decimal place', () => {
        let validAmountOneDecimal = ONE_DECIMAL.toString();
        let formattedAmount = parseFloat(validAmountOneDecimal).toFixed(2);
        event.currentTarget.value = validAmountOneDecimal;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(formattedAmount);
      });

      it('sets the value on state of a number with two decimal places', () => {
        let validAmountTwoDecimal = TWO_DECIMAL.toString();
        let formattedAmount = parseFloat(validAmountTwoDecimal).toFixed(2);
        event.currentTarget.value = validAmountTwoDecimal;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(formattedAmount);
      });
    });

    describe('when the price entered by the user is invalid', () => {
      it('does not set the value on state when a number has more than two decimal places', () => {
        let validAmountThreeDecimal = THREE_DECIMAL.toString();
        event.currentTarget.value = validAmountThreeDecimal;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(DEFAULT_VALUE);
      });

      it('does not set the value on state when the leading digit is a zero', () => {
        event.currentTarget.value = ZERO_NUMBER;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(DEFAULT_VALUE);
      });

      it('does not set the value on state when the leading character is a minus sign', () => {
        event.currentTarget.value = MINUS;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(DEFAULT_VALUE);
      });

      it('does not set the value on state when there is a non-numeric character', () => {
        event.currentTarget.value = INVALID;

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(DEFAULT_VALUE);
      });

      xit('does not set the value on state when a number is less than the minimum', () => {
        let underLimit = MIN - 1;
        event.currentTarget.value = underLimit.toString();

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(DEFAULT_VALUE);
      });

      it('does not set the value on state when a number is more than the maximum', () => {
        let overLimit = MAX + 1;
        event.currentTarget.value = overLimit.toString();

        wrapper.find("PriceInput").props().handleChange(event);

        expect(wrapper.state().value).toBe(DEFAULT_VALUE);
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
        value: DEFAULT_VALUE,
        canGetPriceInformation: false
      });
      event = {
        currentTarget: {
          value: DEFAULT_VALUE
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
      highTime = 1550880000;
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

        expect(wrapper.state().currentClock.time).toEqual(highTime);
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

        expect(wrapper.state().currentClock.time).toEqual(highTime);
        expect(wrapper.state().currentClock.time).not.toEqual(lowTime);
      });
    });
  });
});
