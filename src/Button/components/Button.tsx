import React, { SFC, MouseEvent} from 'react';

type Props = {
  id: string
  doSearch(event: MouseEvent<HTMLElement>): void
}

const Button: SFC<Props> = ({ id, doSearch, children }) => (
  <div className="button">
    <button className="price-submit-button" type="button"
      id={id}
      onClick={ev => doSearch(ev)}
    >
      {children}
    </button>
  </div>
)

export default Button;
