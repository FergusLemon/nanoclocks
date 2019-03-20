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

const PriceDisplay: SFC<Props> = ({ children: {BTC, USD, EUR, GBP} }) => (
  <div className="price-display-container">
    <ul className="price-display">
      <li className="btc">BTC: {BTC}</li>
      <li className="usd">USD: {USD}</li>
      <li className="eur">EUR: {EUR}</li>
      <li className="gbp">GBP: {GBP}</li>
    </ul>
  </div>
)

export default PriceDisplay
