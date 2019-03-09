import * as React from 'react';
import moment from 'moment';
import '../styles/clock.css';

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
  humanClock: '',
  currentTime: Date.now(),
};

type State = Readonly<typeof initialState>;
type Props = {
  lastTime: number,
  userPrice: string,
  nearestPrice: string
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
    const days = moment(now).diff(moment(then), 'd');
    const duration: any = moment.duration(moment(now).diff(moment(then)));
    const humanizedDuration: string = duration.humanize();
    const durationHash = duration._data;
    this.setState({
      days: days,
      hours: durationHash['hours'],
      minutes: durationHash['minutes'],
      seconds: durationHash['seconds'],
      humanClock: humanizedDuration,
    });
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
    let { days, hours, minutes, seconds, humanClock } = this.state;
    const priceToDisplay = (nearestPrice === '' ? userPrice : nearestPrice)
    return (
      <div className="clock-container">
        { lastTime !== 0 &&
            <div className="clock">
              <p className="days">{days < doubleDigits ? 0 : ''}{days}</p>
              <p className="hours">{hours < doubleDigits ? 0 : ''}{hours}</p>
              <p className="minutes">{minutes < doubleDigits ? 0 : ''}{minutes}</p>
              <p className="seconds">{seconds < doubleDigits ? 0 : ''}{seconds}</p>
            </div>
        }
        { lastTime !== 0 &&
          <div className="humanized-clock">
            It has been approximately {humanClock} since NANO traded at {priceToDisplay} USD.
          </div>
        }
    </div>
    )
  }
};

export default Clock;
