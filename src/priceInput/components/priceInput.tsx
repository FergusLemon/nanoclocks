import React, { SFC } from 'react';

type Props = {
  id: string
}

const PriceInput: SFC<Props> = ({ id: id, children }) => (
  <div className="price-input-field-container">
    <label htmlFor={id} className="price-input-label">Enter a price</label>
  </div>
)

export default PriceInput;
