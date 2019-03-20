import React, { SFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Footer.css';

const Footer: SFC = ({ children }) => (
  <footer className="footer-container">
    <p className="footer-message">
      Join The Conversation
    </p>
    <div className="social-media-container">
      <a href="https://www.reddit.com/r/nanocurrency">
        <FontAwesomeIcon icon={['fab', 'reddit']} className="icon" />
      </a>
      <a href="https://twitter.com/nano?lang=en">
        <FontAwesomeIcon icon={['fab', 'twitter']} className="icon" />
      </a>
      <a href="https://discordapp.com/invite/JphbBas">
        <FontAwesomeIcon icon={['fab', 'discord']} className="icon" />
      </a>
      <a href="https://medium.com/nanocurrency">
        <FontAwesomeIcon icon={['fab', 'medium']} className="icon" />
      </a>
      <a href="https://github.com/nanocurrency">
        <FontAwesomeIcon icon={['fab', 'github']} className="icon" />
      </a>
    </div>
  </footer>
)

export default Footer;
