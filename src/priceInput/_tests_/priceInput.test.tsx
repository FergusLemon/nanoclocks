import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../setupTests';
import { shallow } from 'enzyme';
import PriceInput from '../components/priceInput';
import getElement from '../../common/utils/getElement';

const setup = (input = {}) => (
  {
    title: input.id || 'id',
    value: input.value || 'value',
  }
);
const SEVEN = 7;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceInput />, div);
});

describe("PriceInput", () => {
  it('passes the id prop to a label', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('label')('price-input-label').length).toBe(1);
  });

  it('passes the value prop to the value of the text input', () => {
    const testEnv = setup({ value: 7 });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('input')('price-input-field').props().value).toBe(SEVEN);
  });
});
