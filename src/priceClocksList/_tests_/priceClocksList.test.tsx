import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests.ts';
import getElement from '../../common/getElement';
import PriceClocksList from '../components/PriceClocksList';

describe('PriceClocksList', () => {
  it('renders without crashing', () => {
    shallow(<PriceClocksList />);
  });
});
