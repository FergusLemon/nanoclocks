import React from 'react';

const initialState = {};

type State = Readonly<typeof initialState>;

class Clock extends React.Component<object, State> {
  readonly state: State = initialState;

  render() {}
};

export default Clock;
