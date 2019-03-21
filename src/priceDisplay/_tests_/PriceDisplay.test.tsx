import * as React from 'react'
import '../../setupTests'
import { shallow } from 'enzyme'
import PriceDisplay from '../components/PriceDisplay'
import getElement from '../../common/utils/getElement'

const DEFAULT = '';
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

  it('has displays default values for props when none are passed down', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    expect(getElement(wrapper)('li')('btc').text()).not.toContain(/[0-9]/);
    expect(getElement(wrapper)('li')('usd').text()).not.toContain(/[0-9]/);
  });

  it('has displays values passed in on props', () => {
    const testEnv = setup({children:{BTC: 0.00025, USD: 1.00}});
    const {BTC, USD} = testEnv.children;
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    expect(getElement(wrapper)('li')('btc').text()).toContain(BTC);
    expect(getElement(wrapper)('li')('usd').text()).toContain(USD);
  });
});
