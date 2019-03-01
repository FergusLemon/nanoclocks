import React, { SFC } from 'react';

type Props = {
  clocks: Array
};

const PriceClocksList: SFC<Props> = ({ clocks, children }) => (
  <div className="price-clocks-list">
  {
    !clocks || clocks.length === 0 && "There are no clocks on display."
  }
  </div>
)

export default PriceClocksList;
