import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../setupTests';
import { shallow } from 'enzyme';
import PriceInput from '../components/priceInput';
import getElement from '../../common/utils/getElement';

const setup = (input = {}) => (
  {
    id: input.id || 'id',
    value: input.value || 'value',
    handleBlur: input.handleBlur || jest.fn(),
    handleKeyDown: input.handleKeyDown || jest.fn()
  }
);
const DEFAULT = undefined;
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
    const testEnv = setup({ value: SEVEN });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('input')('price-input-field').props().value)
      .toBe(SEVEN);
  });

    it('should call the handleBlur callback on props with the current value when the input changes', () => {
    const testEnv = setup({
      handleBlur: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    getElement(wrapper)('input')('price-input-field').simulate('blur');
    expect(testEnv.handleBlur).toHaveBeenCalled();
  });

   it('should call the handleEnter callback on props when the enter key is pressed', () => {
    const testEnv = setup({
      handleKeyDown: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: 'Enter' });
    expect(testEnv.handleKeyDown).toHaveBeenCalled();
  });
});
