import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';
import getElement from '../../common/utils/getElement';
import Clock from '../components/Clock';

describe('Clock', () => {
  it('renders without crashing', () => {
    shallow(<Clock />);
  });
});
