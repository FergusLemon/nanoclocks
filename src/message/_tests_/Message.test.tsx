import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../setupTests';
import { shallow } from 'enzyme';
import Message from '../components/Message';
import getElement from '../../common/utils/getElement';

const defaultMessage = `Welcome to NanoClocks, the site that lets you see how
long it has been since NANO traded at a given price in $USD.`;

const setup = (input = {}) => (
  {
    children: input.children || defaultMessage,
  }
);

it('renders without crashing', () => {
  shallow(<Message />);
});

describe('Message', () => {
  it('should display the message passed in on child props', () => {
    const testEnv = setup({
      children: defaultMessage,
    });
    const wrapper = shallow(<Message {...testEnv} />);

    expect(getElement(wrapper)('p')('welcome-message').text())
      .toEqual(defaultMessage);
  });
});
