import * as React from 'react';
import moment from 'moment';
import '../styles/clock.css';
import decimalsNotRequired from '../../common/utils/decimalsNotRequiredRegex';
import missingDecimal from '../../common/utils/missingDecimalRegex';

const defaultValue: number = 0,
      doubleDigits: number = 10,
      maxHours: number = 23,
      maxMinutes: number = 59,
      maxSeconds: number = 59;

const initialState: any = {
  days: defaultValue,
  hours: defaultValue,
  minutes: defaultValue,
  seconds: defaultValue,
  humanizedTime: '',
  humanizedTimeExtra: '',
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
    this.timer = setInterval(this.incrementDifference, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  componentDidUpdate(previousProps: Props) {
    if(this.props.userPrice !== previousProps.userPrice) {
      clearInterval(this.timer);
      this.calculateDifference();
      this.timer = setInterval(this.incrementDifference, 1000);
    }
  };

  calculateDifference = () => {
    const now: number = Date.now();
    const then: number = this.props.lastTime * 1000;
    const days: number = moment(now).diff(moment(then), 'd');
    const duration: any = moment.duration(moment(now).diff(moment(then)));
    const humanizedDuration: string = duration.humanize();
    const durationHash: any = duration._data;
    const humanizedMonths: string = this.shouldDisplayMonthsAndYears(durationHash) ? this.humanizeMonths(durationHash): '';
    this.setState({
      days: days,
      hours: durationHash['hours'],
      minutes: durationHash['minutes'],
      seconds: durationHash['seconds'],
      humanizedTime: humanizedDuration,
      humanizedTimeExtra: humanizedMonths,
    });
  };

  shouldDisplayMonthsAndYears = (durationHash: any): boolean => {
    return durationHash['years'] > 0 && durationHash['months'] > 0;
  };

  humanizeMonths = (durationHash: any): string => {
    return 'and ' + moment.duration(durationHash['months'], 'months').humanize();
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
    const { days, hours, minutes, seconds, humanizedTime, humanizedTimeExtra } = this.state;
    let price: string = (nearestPrice === '' ? userPrice : nearestPrice);
    let priceToDisplay: string;
    if (decimalsNotRequired.test(price)) {
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
              <p className={`large days`}>{days < doubleDigits ? 0 : ''}{days}</p>
              <p className={`small hours`}>{hours < doubleDigits ? 0 : ''}{hours}</p>
              <p className={`small minutes`}>{minutes < doubleDigits ? 0 : ''}{minutes}</p>
              <p className={`small seconds`}>{seconds < doubleDigits ? 0 : ''}{seconds}</p>
            </div>
        }
        { lastTime !== 0 &&
          <div className="humanized-clock">
            It has been approximately {humanizedTime} {humanizedTimeExtra !== '' && humanizedTimeExtra} since NANO traded at
            ${priceToDisplay} USD.
          </div>
        }
    </div>
    )
  }
};

export default Clock;
