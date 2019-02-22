import React, { SFC, FocusEvent, KeyboardEvent } from 'react';
import '../styles/priceInput.css';

type Props = {
  id: string
  value: number | undefined
  handleBlur(event: FocusEvent<HTMLInputElement>): void
  handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void
}

const PriceInput: SFC<Props> = ({ id, value, handleBlur, handleKeyDown, children }) => (
  <div className="price-input-field-container">
    <label htmlFor={id} className="price-input-label">Enter a price</label>
    <input className="price-input-field" type="number" min="0"
      id={id}
      value={value}
      onBlur={handleBlur}
      onKeyDown={ev => (ev.key === 'Enter' || ev.key === '-') && handleKeyDown(ev)}
    />
  </div>
)

export default PriceInput;
