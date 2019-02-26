import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../setupTests';
import { shallow } from 'enzyme';
import Button from '../components/Button';
import getElement from '../../common/utils/getElement';

const setup = (input = {}) => (
  {
    handleClick: input.handleClick || jest.fn()
  }
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
});

describe('Button', () => {
    it('should call the handleClick callback on props when the button is clicked', () => {
    const testEnv = setup({
      handleClick: jest.fn()
    });
    const wrapper = shallow(<Button {...testEnv} />);
    getElement(wrapper)('button')('price-submit-button').simulate('click');
    expect(testEnv.handleClick).toHaveBeenCalled();
  });
});
