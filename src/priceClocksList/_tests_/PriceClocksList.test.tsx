import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests.ts';
import getElement from '../../common/utils/getElement';
import PriceClocksList from '../components/PriceClocksList';

const setup = ( input = {} ) => ({
  clocks: input.clocks || []
});
const message = "There are no clocks on display.";

describe('PriceClocksList', () => {
  it('renders without crashing', () => {
    shallow(<PriceClocksList />);
  });

  it('displays a message when there are no PriceClocks passed in on props', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceClocksList {...testEnv} />);

    expect(getElement(wrapper)('div')('price-clocks-list').text()).toEqual(message);
  })

  it('displays a message when there are no PriceClocks in the list passed in on props', () => {
    const testEnv = setup({
      clocks: []
    });
    const wrapper = shallow(<PriceClocksList {...testEnv} />);

    expect(getElement(wrapper)('div')('price-clocks-list').text()).toEqual(message);
  })
});
