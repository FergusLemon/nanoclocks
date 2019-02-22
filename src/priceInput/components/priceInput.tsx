import React, { SFC } from 'react';

type Props = {
  id: string
  value: number | undefined
}

const PriceInput: SFC<Props> = ({ id, value, children }) => (
  <div className="price-input-field-container">
    <label htmlFor={id} className="price-input-label">Enter a price</label>
    <input className="price-input-field"
      id={id}
      value={value}
    />
  </div>
)

export default PriceInput;
