import * as React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';
import getElement from '../../common/utils/getElement';
import Clock from '../components/Clock';

const DEFAULT_TIME = 1550000000;
const setup = (input = {}) => (
  {
    lastTime: input.lastTime || DEFAULT_TIME,
  }
);

describe('Clock', () => {
  it('renders without crashing', () => {
    shallow(<Clock />);
  });

  it('does not render if lastTime passed in on props is zero', () => {
    const testEnv = setup({});
    const wrapper = shallow(<Clock {...testEnv} />);

    wrapper.setProps({lastTime: 0});
    expect(wrapper.exists('.clock')).toEqual(false);
  });

  it('calls the calculateDifference function on mounting', () => {
    const testEnv = setup({});
    const wrapper = shallow(<Clock {...testEnv} />);
    const spy = jest.spyOn(wrapper.instance(), 'calculateDifference');

    expect(spy).toHaveBeenCalledOnce;

    spy.mockRestore();
  });

  it('sets the value of timeSince on state when mounting', () => {
    const testEnv = setup({});
    const wrapper = shallow(<Clock {...testEnv} />);

    expect(wrapper.state().timeSince).not.toEqual(0);
  });
});
