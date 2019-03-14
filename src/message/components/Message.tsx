import React, { SFC } from 'react';
import '../styles/Message.css';

type Props = {
}

const Message: SFC<Props> = ({ children }) => (
  <div className="message-container">
    <p className="welcome-message">
      {children}
    </p>
  </div>
)

export default Message;
