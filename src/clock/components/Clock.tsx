import * as React from 'react';

const initialState = {
  timeSince: 0,
  currentTime: parseInt((Date.now() / 1000).toFixed()),
};

type State = Readonly<typeof initialState>;
type Props = {
  lastTime: number
};

class Clock extends React.Component<Props, State> {
  readonly state: State = initialState;

  calculateDifference = () => {
    return this.state.currentTime - this.props.lastTime;
  };

  componentDidMount() {
    let difference: number = this.calculateDifference();
    this.setState({
      timeSince: difference,
    });
  };

  render() {
    const { lastTime, children } = this.props;
    return (
      <div className="clock-container">
        { lastTime !== 0 &&
          <div className="clock">{this.state.timeSince}</div>
        }
    </div>
    )
  }
};

export default Clock;
