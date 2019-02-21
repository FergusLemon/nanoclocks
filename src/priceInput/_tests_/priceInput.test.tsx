import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PriceInput from '../components/priceInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceInput />, div);
});
