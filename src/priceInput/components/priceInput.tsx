import React, { SFC, FocusEvent, KeyboardEvent } from 'react';
import '../styles/priceInput.css';

type Props = {
  id: string
  value: number | undefined
  min: string
  max: string
  step: string
  handleBlur(event: FocusEvent<HTMLInputElement>): void
  handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void
}

const PriceInput: SFC<Props> = ({ id, value, min, max, step, handleBlur, handleKeyDown, children }) => (
  <div className="price-input-field-container">
    <label htmlFor={id} className="price-input-label">Enter a price</label>
    <input className="price-input-field" type="number"
      id={id}
      value={value}
      min={min}
      max={max}
      step={step}
      onBlur={handleBlur}
      onKeyDown={ev => (ev.key === 'Enter' || ev.key === '-') && handleKeyDown(ev)}
    />
  </div>
)

export default PriceInput;
