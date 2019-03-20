import * as React from 'react'
import '../../setupTests'
import { shallow } from 'enzyme'
import Button from '../components/Button'
import getElement from '../../common/utils/getElement'

const DEFAULT = "Submit";
const setup = (input = {}) => (
  {
    doSearch: input.doSearch || jest.fn(),
    canGetPriceInformation: input.canGetPriceInformation || false
  }
);

it('renders without crashing', () => {
  shallow(<Button />);
});

describe('Button', () => {
  it('should call the handleClick callback on props when the button is clicked', () => {
    const testEnv = setup({
      doSearch: jest.fn(),
      canGetPriceInformation: true
    });
    const wrapper = shallow(<Button {...testEnv} />);

    getElement(wrapper)('button')('price-submit-button').simulate('click');

    expect(testEnv.doSearch).toHaveBeenCalled();
  });

  it('should use the canGetPriceInformation property to enable or disable the button', () => {
    const testEnv = setup({
      doSearch: jest.fn(),
      canGetPriceInformation: false
    });
    const wrapper = shallow(<Button {...testEnv} />);

    getElement(wrapper)('button')('price-submit-button').simulate('click');

    expect(testEnv.doSearch).not.toHaveBeenCalled();
  });
});
