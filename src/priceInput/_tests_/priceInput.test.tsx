import * as React from 'react'
import '../../setupTests'
import { shallow } from 'enzyme'
import PriceInput from '../components/PriceInput'
import getElement from '../../common/utils/getElement'

const DEFAULT = "";
const setup = (input = {}) => (
  {
    id: input.id || 'id',
    value: input.value || DEFAULT,
    handleChange: input.handleChange || jest.fn(),
    doSearch: input.doSearch || jest.fn(),
    canGetPriceInformation: input.canGetPriceInformation || false
  }
);

it('renders without crashing', () => {
  shallow(<PriceInput />);
});

describe('PriceInput', () => {
  it('passes the "id" prop to a label', () => {
    const testEnv = setup();
    const wrapper = shallow(<PriceInput {...testEnv} />);

    expect(getElement(wrapper)('label')('price-input-label').length).toBe(1);
  });

  it('passes the "value" prop to the value of the text input', () => {
    const testEnv = setup({ value: DEFAULT });
    const wrapper = shallow(<PriceInput {...testEnv} />);

    expect(getElement(wrapper)('input')('price-input-field').props().value)
      .toBe(DEFAULT);
  });

    it('should call the handleChange callback on props with the current value when the input changes', () => {
    const testEnv = setup({
      handleChange: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);

    getElement(wrapper)('input')('price-input-field').simulate('change');

    expect(testEnv.handleChange).toHaveBeenCalled();
  });

   it("should call the doSearch callback on props when the 'Enter' key is pressed", () => {
    const testEnv = setup({
      doSearch: jest.fn(),
      canGetPriceInformation: true
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);

    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: 'Enter' });

    expect(testEnv.doSearch).toHaveBeenCalled();
  });

   it("should not call the doSearch callback on props when a key other than 'Enter' or '-' is pressed", () => {
    const testEnv = setup({
      doSearch: jest.fn()
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);

    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: 'Shift' });

    expect(testEnv.doSearch).not.toHaveBeenCalled();
  });

  it('should use the canGetPriceInformation property to enable or disable the "Enter key"', () => {
    const testEnv = setup({
      doSearch: jest.fn(),
      canGetPriceInformation: false
    });
    const wrapper = shallow(<PriceInput {...testEnv} />);

    getElement(wrapper)('input')('price-input-field')
       .simulate('keydown', { key: 'Enter' });

    expect(testEnv.doSearch).not.toHaveBeenCalled();
  });
});
