import * as React from 'react';
import moment from 'moment';

const defaultValue: number = 0,
      doubleDigits: number = 10,
      maxMonths: number = 11,
      maxDays: number = 30,
      maxHours: number = 23,
      maxMinutes: number = 59,
      maxSeconds: number = 59;

const initialState: any = {
  years: defaultValue,
  months: defaultValue,
  days: defaultValue,
  hours: defaultValue,
  minutes: defaultValue,
  seconds: defaultValue,
  currentTime: Date.now(),
};

type State = Readonly<typeof initialState>;
type Props = {
  lastTime: number
};

class Clock extends React.Component<Props, State> {
  readonly state: State = initialState;


  componentDidMount() {
    this.calculateDifference();
    setInterval(this.incrementDifference, 1000);
  };

  calculateDifference = () => {
    const now = this.state.currentTime;
    const then = this.props.lastTime * 1000;
    const duration: any = moment.duration(moment(now).diff(moment(then)));
    const durationHash = duration._data;
    this.setState({
      years: durationHash['years'],
      months: durationHash['months'],
      days: durationHash['days'],
      hours: durationHash['hours'],
      minutes: durationHash['minutes'],
      seconds: durationHash['seconds'],
    });
  };

  incrementDifference = (): void => {
    if (this.shouldIncrementSeconds()) {
      this.updateState("seconds", []);
    } else if (this.shouldIncrementMinutes()) {
      this.updateState("minutes", ["seconds"]);
    } else if (this.shouldIncrementHours()) {
      this.updateState("hours", ["seconds", "minutes"]);
    } else if (this.shouldIncrementDays()) {
      this.updateState("days", ["seconds", "minutes", "hours"]);
    } else if (this.shouldIncrementMonths()) {
      this.updateState("months", ["seconds", "minutes", "hours", "days"]);
    } else {
      this.updateState("years", ["seconds", "minutes", "hours", "days", "months"]);
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

  shouldIncrementDays = (): boolean => {
    return this.state.hours === maxHours && this.state.days < maxDays;
  };

  shouldIncrementMonths = (): boolean => {
    return this.state.days === maxDays && this.state.months < maxMonths;
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
    const { lastTime, children } = this.props;
    let { years, months, days, hours, minutes, seconds } = this.state;
    return (
      <div className="clock-container">
        { lastTime !== 0 &&
          <div className="clock">
            {years < doubleDigits ? 0 : ''}{years}-
            {months < doubleDigits ? 0 : ''}{months}-
            {days < doubleDigits ? 0 : ''}{days}-
            {hours < doubleDigits ? 0 : ''}{hours}:
            {minutes < doubleDigits ? 0 : ''}{minutes}:
            {seconds < doubleDigits ? 0 : ''}{seconds}
          </div>
        }
    </div>
    )
  }
};

export default Clock;
