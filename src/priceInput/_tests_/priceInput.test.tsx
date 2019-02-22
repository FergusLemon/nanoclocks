import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../setupTests';
import { shallow } from 'enzyme';
import PriceInput from '../components/priceInput';
import getElement from '../../common/utils/getElement';

const DEFAULT = undefined,
      SEVEN = 7,
      MIN = "0",
      MAX = "40",
      STEP = "0.05",
      setup = (input = {}) => (
  {
    id: input.id || 'id',
    value: input.value || DEFAULT,
    min: input.min || MIN,
    max: input.max || MAX,
    step: input.step || STEP,
    handleBlur: input.handleBlur || jest.fn(),
    handleKeyDown: input.handleKeyDown || jest.fn()
  }
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceInput />, div);
});

describe('PriceInput', () => {
  it('passes the "id" prop to a label', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('label')('price-input-label').length).toBe(1);
  });

  it('passes the "value" prop to the value of the text input', () => {
    const testEnv = setup({ value: SEVEN });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('input')('price-input-field').props().value)
      .toBe(SEVEN);
  });

  it('passes the "min" prop to the value of the min attribute', () => {
    const testEnv = setup({ min: MIN });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('input')('price-input-field').props().min)
      .toBe(MIN);
  });

  it('passes the "max" prop to the value of the max attribute', () => {
    const testEnv = setup({ max: MAX });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('input')('price-input-field').props().max)
      .toBe(MAX);
  });

  it('passes the "step" prop to the value of the step attribute', () => {
    const testEnv = setup({ step: STEP });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    expect(getElement(wrapper)('input')('price-input-field').props().step)
      .toBe(STEP);
  });

    it('should call the handleBlur callback on props with the current value when the input changes', () => {
    const testEnv = setup({
      handleBlur: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    getElement(wrapper)('input')('price-input-field').simulate('blur');
    expect(testEnv.handleBlur).toHaveBeenCalled();
  });

   it("should call the handleKeyDown callback on props when the 'Enter' key is pressed", () => {
    const testEnv = setup({
      handleKeyDown: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: 'Enter' });
    expect(testEnv.handleKeyDown).toHaveBeenCalled();
  });

   it("should call the handleKeyDown callback on props when the minus sign '-' is pressed", () => {
    const testEnv = setup({
      handleKeyDown: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: '-' });
    expect(testEnv.handleKeyDown).toHaveBeenCalled();
  });

   it("should not call the handleKeyDown callback on props when a key other than 'Enter' or '-' is pressed", () => {
    const testEnv = setup({
      handleKeyDown: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);
    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: 'Shift' });
    expect(testEnv.handleKeyDown).not.toHaveBeenCalled();
  });
});
