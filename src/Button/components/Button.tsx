import React, { SFC, MouseEvent} from 'react';

type Props = {
  id: string
  handleClick(event: MouseEvent<HTMLElement>): void
}

const Button: SFC<Props> = ({ id, handleClick, children }) => (
  <div className="button">
    <button className="price-submit-button"
      id={id}
      onClick={ev => handleClick(ev)}
    >
      {children}
    </button>
  </div>
)

export default Button;
