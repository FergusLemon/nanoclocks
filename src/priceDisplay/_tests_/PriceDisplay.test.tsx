import * as React from 'react'
import '../../setupTests'
import { shallow } from 'enzyme'
import PriceDisplay from '../components/PriceDisplay'
import getElement from '../../common/utils/getElement'

const DEFAULT = '';
const setup = (input = {}) => (
  {
    btc: input.btc || DEFAULT,
    usd: input.usd || DEFAULT,
    eur: input.eur || DEFAULT,
    gbp: input.gbp || DEFAULT,
  }
);

describe('PriceInput', () => {
  it('renders without crashing', () => {
    shallow(<PriceDisplay />);
  });

  it('has displays default values for props when none are passed down', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    expect(getElement(wrapper)('p')('btc').text()).toBe('BTC: ');
    expect(getElement(wrapper)('p')('usd').text()).toBe('USD: ');
    expect(getElement(wrapper)('p')('eur').text()).toBe('EUR: ');
    expect(getElement(wrapper)('p')('gbp').text()).toBe('GBP: ');
  });

  it('has displays values passed in on props', () => {
    const testEnv = setup({btc: 0.00025, usd: 1.00});
    const wrapper = shallow(<PriceDisplay {...testEnv} />);

    expect(getElement(wrapper)('p')('btc').text()).toBe('BTC: ' + testEnv.btc);
    expect(getElement(wrapper)('p')('usd').text()).toBe('USD: ' + testEnv.usd);
  });
});
