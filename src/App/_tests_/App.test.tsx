import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import '../../setupTests';
import { shallow } from 'enzyme';
import getElement from '../../common/utils/getElement';

const DEFAULT_VALUE = "",
      MIN = 5,
      MAX = 40,
      MINUS = "-",
      setup = (input = {}) => (
  {
    value: input.value || DEFAULT_VALUE
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
          value: MIN
        }
      };
    });

    it('sets the value of state when passed a valid number from the PriceInput component', () => {
      wrapper.find("PriceInput").props().handleChange(event);
      expect(wrapper.state().value).toBe(MIN);
    });

    it('does not set the value of state when passed a minus sign from the PriceInput component', () => {
      event.currentTarget.value = MINUS;
      wrapper.find("PriceInput").props().handleChange(event);
      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    it('does not set the value of state when passed a number lower than the minimum from the PriceInput component', () => {
      event.currentTarget.value = MIN - 1;
      wrapper.find("PriceInput").props().handleChange(event);
      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });

    it('does not set the value of state when passed a number higher than the maximum from the PriceInput component', () => {
      event.currentTarget.value = MAX + 1;
      wrapper.find("PriceInput").props().handleChange(event);
      expect(wrapper.state().value).toBe(DEFAULT_VALUE);
    });
  });
});
