import React, { SFC } from 'react'
import '../styles/PriceDisplay.css'

type Props = {
  btc: number | string
  usd: number | string
  eur: number | string
  gbp: number | string
}

const PriceDisplay: SFC<Props> = ({ btc, usd, eur, gbp, children }) => (
  <div className="price-display-container">
    <div className="price-display">
      <p className="btc">BTC: {btc}</p>
      <p className="usd">USD: {usd}</p>
      <p className="eur">EUR: {eur}</p>
      <p className="gbp">GBP: {gbp}</p>
    </div>
  </div>
)

export default PriceDisplay
