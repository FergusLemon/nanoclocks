import React, { SFC, MouseEvent} from 'react'
import '../styles/Button.css'

type Props = {
  id: string
  doSearch(event: MouseEvent<HTMLElement>): void
  canGetPriceInformation: boolean
}

const Button: SFC<Props> = ({ id, doSearch, canGetPriceInformation, children }) => (
  <div className="button-container">
    <button className="price-submit-button" type="button"
      id={id}
      onClick={ev => canGetPriceInformation && doSearch(ev)}
    >
      {children}
    </button>
  </div>
)

export default Button
