import * as React from 'react';
import moment from 'moment';
import '../styles/clock.css';
import decimalsNotRequired from '../../common/utils/decimalsNotRequiredRegex';
import missingDecimal from '../../common/utils/missingDecimalRegex';

const defaultValue: number = 0,
      doubleDigits: number = 10,
      maxHours: number = 23,
      maxMinutes: number = 59,
      maxSeconds: number = 59,
      defaultTimerInterval = 1000,
      millisecondConversionValue = 1000;

const initialState: any = {
  days: defaultValue,
  hours: defaultValue,
  minutes: defaultValue,
  seconds: defaultValue,
  summarizedTime: '',
};

type State = Readonly<typeof initialState>;
type Props = {
  lastTime: number,
  userPrice: string,
  nearestPrice: string
};

class Clock extends React.Component<Props, State> {
  readonly state: State = initialState;

  timer: any;

  componentDidMount() {
    this.calculateDifference();
    this.timer = setInterval(this.incrementDifference, defaultTimerInterval);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  componentDidUpdate(previousProps: Props) {
    if(this.props.userPrice !== previousProps.userPrice) {
      clearInterval(this.timer);
      this.calculateDifference();
      this.timer = setInterval(this.incrementDifference, defaultTimerInterval);
    }
  };

  calculateDifference = () => {
    const now: number = Date.now();
    const then: number = this.props.lastTime * millisecondConversionValue;
    const days: number = moment(now).diff(moment(then), 'd');
    const duration: any = moment.duration(moment(now).diff(moment(then)));
    const summarizedDuration: string = duration.humanize();
    const durationHash: any = duration._data;
    const summaryToDisplay: string =
      this.shouldDisplayMonthsAndYears(durationHash)
      ? this.summarizeYearsAndMonths(durationHash)
      : summarizedDuration;
    this.setState({
      days: days,
      hours: durationHash['hours'],
      minutes: durationHash['minutes'],
      seconds: durationHash['seconds'],
      summarizedTime: summaryToDisplay,
    });
  };

  shouldDisplayMonthsAndYears = (durationHash: any): boolean => {
    return durationHash['years'] > 0 && durationHash['months'] > 0;
  };

  summarizeYearsAndMonths = (durationHash: any): string => {
    const { years, months } = durationHash;
    const yearlyDisplay = years > 1 ? 'years' : 'year';
    const monthlyDisplay = months > 1 ? 'months' : 'month';
    return years + ' ' + yearlyDisplay + ' and ' + months + ' ' + monthlyDisplay;
  };

  incrementDifference = (): void => {
    if (this.shouldIncrementSeconds()) {
      this.updateState("seconds", []);
    } else if (this.shouldIncrementMinutes()) {
      this.updateState("minutes", ["seconds"]);
    } else if (this.shouldIncrementHours()) {
      this.updateState("hours", ["seconds", "minutes"]);
    } else {
      this.updateState("days", ["seconds", "minutes", "hours"]);
    };
  };

  shouldIncrementSeconds = (): boolean => {
    return this.state.seconds < maxSeconds;
  };

  shouldIncrementMinutes = (): boolean => {
    return this.state.seconds === maxSeconds && this.state.minutes < maxMinutes;
  };

  shouldIncrementHours = (): boolean => {
    return this.state.minutes === maxMinutes && this.state.hours < maxHours;
  };

  updateState = (toIncrement: string, toReset: Array<string>): void => {
    this.setState({
      [toIncrement]: this.state[toIncrement] + 1
    });
    for (let property of toReset) {
      this.setState({
        [property]: defaultValue
      });
    };
  };

  render() {
    const { lastTime, userPrice, nearestPrice, children } = this.props;
    const { days, hours, minutes, seconds, summarizedTime } = this.state;
    let price: string = (nearestPrice === '' ? userPrice : nearestPrice);
    let priceToDisplay: string;
    if (decimalsNotRequired.test(price)) {
      //exclamation point(!) used to negate the possibility of a null value
      //being returned from string.match()
      priceToDisplay = price.match(decimalsNotRequired)![1];
    } else {
      priceToDisplay = (missingDecimal.test(price) ? price += '0' : price);
    }
    return (
      <div className="clock-container">
        { lastTime !== 0 &&
            <div className="clock-display">
              <p className={`large unit`}>DD</p>
              <p className={`small unit`}>HH</p>
              <p className={`small unit`}>MM</p>
              <p className={`small unit`}>SS</p>
              <p className={`large days`}>{days < doubleDigits ? 0 : ''}
              {days}</p>
              <p className={`small hours`}>{hours < doubleDigits ? 0 : ''}
              {hours}</p>
              <p className={`small minutes`}>{minutes < doubleDigits ? 0 : ''}
              {minutes}</p>
              <p className={`small seconds`}>{seconds < doubleDigits ? 0 : ''}
              {seconds}</p>
            </div>
        }
        { lastTime !== 0 &&
          <div className="clock-summary">
            It has been approximately <b>{summarizedTime} </b>
            since NANO traded at <b>${priceToDisplay} USD</b>.
          </div>
        }
    </div>
    )
  }
};

export default Clock;
