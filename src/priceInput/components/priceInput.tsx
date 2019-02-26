import React, { SFC, ChangeEvent, KeyboardEvent } from 'react';
import '../styles/PriceInput.css';

type Props = {
  id: string
  value: string
  handleChange(event: ChangeEvent<HTMLInputElement>): void
  handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void
}

const PriceInput: SFC<Props> = ({ id, value, handleChange, handleKeyDown, children }) => (
  <div className="price-input-field-container">
    <label htmlFor={id} className="price-input-label">Enter a price</label>
    <input className="price-input-field" type="tel"
      id={id}
      value={value}
      onChange={ev => handleChange(ev)}
      onKeyDown={ev => (ev.key === 'Enter') && handleKeyDown(ev)}
    />
  </div>
)

export default PriceInput;
