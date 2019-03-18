import React, { SFC } from 'react';
import logo from '../../logo.svg';
import '../styles/Message.css';

type Props = {
}

const Message: SFC<Props> = ({ children }) => (
  <div className="message-container">
    <p className="welcome-message">
      {children}
    </p>
    <img className="nano-logo" src={logo} alt="The Nano currency logo"/>
  </div>
)

export default Message;
