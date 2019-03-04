import * as React from 'react';
import moment from 'moment';

const defaultValue: number = 0,
      maxMonths: number = 11,
      maxDays: number = 30,
      maxHours: number = 23,
      maxMinutes: number = 59,
      maxSeconds: number = 59;
const initialState = {
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
    //if (this.props.lastTime === 0) return;
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

  incrementDifference = () => {
    if (this.state.seconds < maxSeconds) {
      this.setState({
        seconds: this.state.seconds + 1
      });
    } else if (this.state.seconds === maxSeconds && this.state.minutes < maxMinutes) {
      this.setState({
        minutes: this.state.minutes + 1,
        seconds: defaultValue
      });
    } else if (this.state.minutes === maxMinutes && this.state.hours < maxHours) {
      this.setState({
        hours: this.state.hours + 1,
        minutes: defaultValue,
        seconds: defaultValue
      });
    } else if (this.state.hours === maxHours && this.state.days < maxDays) {
      this.setState({
        days: this.state.days + 1,
        hours: defaultValue,
        minutes: defaultValue,
        seconds: defaultValue
      });
    } else if (this.state.days === maxDays && this.state.months < maxMonths) {
      this.setState({
        months: this.state.months + 1,
        days: defaultValue,
        hours: defaultValue,
        minutes: defaultValue,
        seconds: defaultValue
      });
    } else {
      this.setState({
        years: this.state.years + 1,
        months: defaultValue,
        days: defaultValue,
        hours: defaultValue,
        minutes: defaultValue,
        seconds: defaultValue
      });
    };
  };

  render() {
    const { lastTime, children } = this.props;
    return (
      <div className="clock-container">
        { lastTime !== 0 &&
          <div className="clock">
            {this.state.years}-
            {this.state.months}-
            {this.state.days}-
            {this.state.hours}:
            {this.state.minutes}:
            {this.state.seconds}
          </div>
        }
    </div>
    )
  }
};

export default Clock;
