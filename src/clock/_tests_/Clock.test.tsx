import * as React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';
import getElement from '../../common/utils/getElement';
import Clock from '../components/Clock';

const defaultTime = 1550000000,
      timer = 1000,
      defaultValue = 0,
      maxSeconds = 59,
      maxMinutes = maxSeconds,
      maxHours = 23,
      maxDays = 30,
      maxMonths = 11,
      withinRange = 5;
const setup = (input = {}) => (
  {
    lastTime: input.lastTime || defaultTime,
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

  it(`sets the value of year, month, day, hour, minute and second on state when
    mounting`, () => {
    const testEnv = setup({});
    const wrapper = shallow(<Clock {...testEnv} />);

    expect(wrapper.state().seconds).not.toEqual(defaultValue);
  });

  it('tells the browser to call the setInterval function whilst mounted',
    () => {
    jest.useFakeTimers();
    const testEnv = setup({});
    const wrapper = shallow(<Clock {...testEnv} />);

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), timer);
  });

  it('calls the setInterval function with incrementDifference', () => {
    jest.useFakeTimers();
    const testEnv = setup({});
    const wrapper = shallow(<Clock {...testEnv} />);
    const incrementDifference = wrapper.instance().incrementDifference;

    expect(setInterval).toHaveBeenLastCalledWith(incrementDifference, timer);
  });

  describe('updating state using the timer', () => {
    let testEnv, wrapper;
    beforeEach(() => {
      jest.useFakeTimers();
      testEnv = setup({});
      wrapper = shallow(<Clock {...testEnv} />);
    });

    describe(`when the value of seconds on state is less than the maximum`,
      () => {
      it('increments the value on state by one', () => {
        wrapper.setState({ seconds: defaultValue });

        jest.advanceTimersByTime(timer);

        expect(wrapper.state().seconds).toEqual(defaultValue + 1);
      });
    });

    describe(`when the value of seconds on state is at the maximum but minutes
      is not`, () => {
      it(`increments the value of minutes on state by one and resets the value
          of lower timeframes to zero`, () => {
        wrapper.setState({
          minutes: withinRange,
          seconds: maxSeconds
        });

        jest.advanceTimersByTime(timer);

        expect(wrapper.state().minutes).toEqual(withinRange + 1);
        expect(wrapper.state().seconds).toEqual(defaultValue);
      });
    });

    describe(`when the value of minutes on state is at the maximum but hours is
      not`, () => {
        it(`increments the value of hours on state by one and resets the value of
          lower timeframes to zero`, () => {
          wrapper.setState({
            hours: withinRange,
            minutes: maxMinutes,
            seconds: maxSeconds
          });

          jest.advanceTimersByTime(timer);

          expect(wrapper.state().hours).toEqual(withinRange + 1);
          expect(wrapper.state().minutes).toEqual(defaultValue);
          expect(wrapper.state().seconds).toEqual(defaultValue);
      });
    });

    describe(`when the value of hours on state is at the maximum but days is
      not`, () => {
        it(`increments the value of days on state by one and resets the value of
          lower timframes to zero`, () => {
          wrapper.setState({
            days: withinRange,
            hours: maxHours,
            minutes: maxMinutes,
            seconds: maxSeconds
          });

          jest.advanceTimersByTime(timer);

          expect(wrapper.state().days).toEqual(withinRange + 1);
          expect(wrapper.state().hours).toEqual(defaultValue);
          expect(wrapper.state().minutes).toEqual(defaultValue);
          expect(wrapper.state().seconds).toEqual(defaultValue);
      });
    });

    describe(`when the value of days on state is at the maximum but months is
      not`, () => {
        it(`increments the value of months on state by one and resets the value
          of lower timframes to zero`, () => {
          wrapper.setState({
            months: withinRange,
            days: maxDays,
            hours: maxHours,
            minutes: maxMinutes,
            seconds: maxSeconds
          });

          jest.advanceTimersByTime(timer);

          expect(wrapper.state().months).toEqual(withinRange + 1);
          expect(wrapper.state().days).toEqual(defaultValue);
          expect(wrapper.state().hours).toEqual(defaultValue);
          expect(wrapper.state().minutes).toEqual(defaultValue);
          expect(wrapper.state().seconds).toEqual(defaultValue);
      });
    });

    describe('when the value of months on state is at the maximum', () => {
      it(`increments the value of years on state by one and resets the value of
        lower timframes to zero`, () => {
        wrapper.setState({
          years: defaultValue,
          months: maxMonths,
          days: maxDays,
          hours: maxHours,
          minutes: maxMinutes,
          seconds: maxSeconds
        });

        jest.advanceTimersByTime(timer);

        expect(wrapper.state().years).toEqual(defaultValue + 1);
        expect(wrapper.state().months).toEqual(defaultValue);
        expect(wrapper.state().days).toEqual(defaultValue);
        expect(wrapper.state().hours).toEqual(defaultValue);
        expect(wrapper.state().minutes).toEqual(defaultValue);
        expect(wrapper.state().seconds).toEqual(defaultValue);
      });
    });
  });
});
