import * as React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';
import getElement from '../../common/utils/getElement';
import Clock from '../components/Clock';

const defaultTimeNow = 1550000000000,
      oneYearTwoMonthsAgo = 1513036800,
      timer = 1000,
      defaultValue = 0,
      maxSeconds = 59,
      maxMinutes = maxSeconds,
      maxHours = 23,
      withinRange = 5,
      oneUnitOfTime = `01`,
      defaultPrice = '',
      userPrice = '1.00',
      roundedPrice = '1',
      oneDecimal = '1.1',
      twoDecimals = '1.10',
      nearestPrice = '2.99';
const setup = (input = {}) => (
  {
    lastTime: input.lastTime || defaultTimeNow,
    userPrice: input.userPrice || defaultPrice,
    nearestPrice: input.nearestPrice || defaultPrice
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

  it(`sets the value of day, hour, minute and second on state when
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

    describe('displaying a clock to the user', () => {
      it(`should show all timeframes from days to seconds`, () => {
        wrapper.setState({
          days: defaultValue,
          hours: maxHours,
          minutes: maxMinutes,
          seconds: maxSeconds,
        });

        jest.advanceTimersByTime(timer);

        expect(getElement(wrapper)('p')('days').text()).toEqual(oneUnitOfTime);
        expect(getElement(wrapper)('div')('clock-summary')
          .text()).not.toBeEmpty;
      });

      it(`should include the price entered by the user if no nearestPrice was
        passed in on props`, () => {
          testEnv = setup({ userPrice: roundedPrice });
          wrapper = shallow(<Clock{...testEnv}/>)

          expect(getElement(wrapper)('div')('clock-summary').text())
            .toContain(roundedPrice + ' USD');
      });

      it(`should include the nearest price if nearestPrice was passed in on
        props`, () => {
          testEnv = setup({ nearestPrice: nearestPrice });
          wrapper = shallow(<Clock{...testEnv}/>)

          expect(getElement(wrapper)('div')('clock-summary').text())
            .toContain(nearestPrice);
      });

      it(`should display the price with no decimal places if the price is a
        rounded dollar amount`, () => {
          testEnv = setup({ userPrice: userPrice });
          wrapper = shallow(<Clock{...testEnv}/>)

          expect(getElement(wrapper)('div')('clock-summary').text())
            .toContain(roundedPrice);
          expect(getElement(wrapper)('div')('clock-summary').text())
            .not.toContain(userPrice);
      });

      it(`should display the price with two decimal places if the price has a
        positive integer in the tens decimal place`, () => {
          testEnv = setup({ userPrice: oneDecimal });
          wrapper = shallow(<Clock{...testEnv}/>)

          expect(getElement(wrapper)('div')('clock-summary').text())
            .toContain(twoDecimals);
      });

      it(`should display the time since in years and months when the
        durationHash has one or more years and one or more months`, () => {
          const dateNowSpy = jest.spyOn(Date, 'now')
            .mockImplementation(() => defaultTimeNow);
          testEnv = setup({ lastTime: oneYearTwoMonthsAgo, userPrice: userPrice });
          wrapper = shallow(<Clock{...testEnv}/>)

          expect(getElement(wrapper)('div')('clock-summary').text())
            .toContain(`2 months`);
          dateNowSpy.mockRestore();
      });
    });
  });
});
