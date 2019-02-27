import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import '../../setupTests';
import { shallow } from 'enzyme';
import getElement from '../../common/utils/getElement';
jest.mock('../../communications/cryptoCompareApi');
import mockCryptoCompareApi from '../../communications/cryptoCompareApi';

const DEFAULT_VALUE = "",
      MINUS = "-",
      MIN = 5,
      MAX = 40,
      ONE_DECIMAL = 5.1,
      TWO_DECIMAL = 5.15,
      THREE_DECIMAL = 5.155,
      ZERO_NUMBER = "01",
      INVALID = "Invalid";
const setup = (input = {}) => (
  {
    value: input.value || DEFAULT_VALUE,
    canGetPriceInformation: input.canGetPriceInformation || false
  }
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App", () => {
  it('passes the value in state to the PriceInput component', () => {
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

    it('sets the value of state when passed a valid number from the PriceInput component', () => {
      let validAmount = MIN.toString();
      event.currentTarget.value = validAmount;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(validAmount);
    });

    it('sets the value of state when passed a valid two digit number where the first digit is less than the minimum from the PriceInput component', () => {
      let validAmount = (MIN + 30).toString();
      event.currentTarget.value = validAmount;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(validAmount);
    });

    it('sets the value of state when passed a valid number with one decimal place from the PriceInput component', () => {
      let validAmountOneDecimal = ONE_DECIMAL.toString();
      event.currentTarget.value = validAmountOneDecimal;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(validAmountOneDecimal);
    });

    it('sets the value of state when passed a valid number with two decimal places from the PriceInput component', () => {
      let validAmountTwoDecimal = TWO_DECIMAL.toString();
      event.currentTarget.value = validAmountTwoDecimal;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(validAmountTwoDecimal);
    });

    it('does not set the value of state when passed a number with more than two decimal places from the PriceInput component', () => {
      let validAmountThreeDecimal = THREE_DECIMAL.toString();
      event.currentTarget.value = validAmountThreeDecimal;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    it('does not set the value of state when passed a zero followed by another number from the PriceInput component', () => {
      event.currentTarget.value = ZERO_NUMBER;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    it('does not set the value of state when passed a minus sign from the PriceInput component', () => {
      event.currentTarget.value = MINUS;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    it('does not set the value of state when passed a non-numeric character from the PriceInput component', () => {
      event.currentTarget.value = INVALID;

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    xit('does not set the value of state when passed a number lower than the minimum from the PriceInput component', () => {
      let underLimit = MIN - 1;
      event.currentTarget.value = underLimit.toString();

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    it('does not set the value of state when passed a number higher than the maximum from the PriceInput component', () => {
      let overLimit = MAX + 1;
      event.currentTarget.value = overLimit.toString();

      wrapper.find("PriceInput").props().handleChange(event);

      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });
  });

  describe("Calling the CryptoCompare API", () => {
       it('should supply the time to the time property of state when doSearch is called by the PriceInput', async () => {
      const wrapper = shallow(<App />);
      const prices = {
        data: [{
          "high": 0.9351,
          "time": 1550620800,
          }]
      };
      const high = prices.data[0].high;
      const time = prices.data[0].time;
      mockCryptoCompareApi.getPriceInformation.mockImplementationOnce(() =>
        new Promise(resolve => resolve(prices)));

      await wrapper.find('PriceInput').props().doSearch();
      let priceHistoryObj = wrapper.state().priceHistory;

      expect(wrapper.state().priceHistory[high]).toEqual(time);
      expect(Object.keys(priceHistoryObj).length).toEqual(1);
      expect(mockCryptoCompareApi.getPrices).toHaveBeenCalledOnce;
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
      let prices = { data: [] };
      let validAmount = MAX.toString();
      event.currentTarget.value = validAmount;

      wrapper.find('PriceInput').props().handleChange(event);
      mockCryptoCompareApi.getPriceInformation.mockImplementationOnce(() =>
        new Promise(resolve => resolve(prices)));
      await wrapper.find('PriceInput').props().doSearch();

      expect(wrapper.state().canGetPriceInformation).toEqual(true);
    });
  });
});
