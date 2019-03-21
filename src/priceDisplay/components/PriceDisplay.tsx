import React, { SFC } from 'react'
import '../styles/PriceDisplay.css'

type Props = {
  children: {
    BTC: number | string
    USD: number | string
    EUR: number | string
    GBP: number | string
  }
}

const PriceDisplay: SFC<Props> = ({ children: {BTC, USD} }) => (
  <div className="price-display-container">
    <ul className="price-display">
      <li className="btc">₿ {BTC} btc</li>
      <li className="usd">${USD} USD</li>
    </ul>
  </div>
)

export default PriceDisplay
