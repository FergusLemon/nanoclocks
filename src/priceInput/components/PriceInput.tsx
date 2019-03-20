import React, { SFC, ChangeEvent, KeyboardEvent } from 'react'
import '../styles/PriceInput.css'

type Props = {
  id: string
  value: string
  handleChange(event: ChangeEvent<HTMLInputElement>): void
  doSearch(event: KeyboardEvent<HTMLInputElement>): void
  canGetPriceInformation: boolean
}

const PriceInput: SFC<Props> = ({ id, value, handleChange, doSearch, canGetPriceInformation, children }) => (
  <div className="price-input-field-container">
    <label htmlFor={id} className="price-input-label">Enter a price in $USD</label>
    <input className="price-input-field" type="tel"
      id={id}
      value={value}
      onChange={ev => handleChange(ev)}
      onKeyDown={ev => (ev.key === 'Enter')  && canGetPriceInformation && doSearch(ev)}
    />
  </div>
)

export default PriceInput
