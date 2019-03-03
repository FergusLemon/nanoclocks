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
    const { lastTime } = this.props;
    return (
      <div className="clock">{this.state.timeSince}</div>
    )
  }
};

export default Clock;
