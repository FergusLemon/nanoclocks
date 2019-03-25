import * as React from 'react'
import '../../setupTests'
import { shallow } from 'enzyme'
import PriceDisplay from '../components/PriceDisplay'
import getElement from '../../common/utils/getElement'

const DEFAULT = '';
const timer = 6000;
const setup = (input = {}) => (
  {
    children: {
      BTC: input.BTC || DEFAULT,
      USD: input.USD || DEFAULT,
      EUR: input.EUR || DEFAULT,
      GBP: input.GBP || DEFAULT,
    }
  }
);

describe('PriceInput', () => {
  it('renders without crashing', () => {
    const testEnv = setup();
    shallow(<PriceDisplay {...testEnv} />);
  });

  it('displays default values for props when none are passed down', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    expect(getElement(wrapper)('li')('display').text()).not.toContain(/[0-9]/);
  });

  it('displays values passed in on props', () => {
    const testEnv = setup({children:{BTC: 0.00025}});
    const {BTC} = testEnv.children;
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    expect(getElement(wrapper)('li')('display').text()).toContain(BTC);
  });

  it('calls the setInterval function with updatePriceToDisplay', () => {
    jest.useFakeTimers();
    const testEnv = setup({});
    const wrapper = shallow(<PriceDisplay {...testEnv} />);
    const updatePriceToDisplay = wrapper.instance().updatePriceToDisplay;

    expect(setInterval).toHaveBeenLastCalledWith(updatePriceToDisplay, timer);
  });

  it('changes the price displayed at a specified interval', () => {
    jest.useFakeTimers();
    const testEnv = setup({children:{BTC: 0.00025, USD: 1.00}});
    const {BTC, USD} = testEnv.children;
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    jest.advanceTimersByTime(timer);
    expect(getElement(wrapper)('li')('display').text()).toContain(USD);
  });
});
