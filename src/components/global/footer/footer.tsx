import Container from '@/components/common/layout/container/container';
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer} data-cy="footer">
      <Container className={styles.content}>
        <div className={styles.social} data-cy="footerSocialMenu">
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/robbailey3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/robbailey3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/rob_bailey3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://stackoverflow.com/users/7959497/rob-bailey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">StackOverflow</span>
                <FontAwesomeIcon icon={faStackOverflow}></FontAwesomeIcon>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.about} data-cy="footerGetInTouch">
          <h4>Contact Me</h4>
          <p>
            If you have any questions or just want to say hello, please get in
            touch.
          </p>
          <div className={styles.cta_container}>
            <a href="mailto:rob.bailey3@gmail.com" className={styles.cta}>
              Say Hello
            </a>
          </div>
        </div>
        <div className={styles.attribution} data-cy="footerAttribution">
          <p className="monospace">Created by Rob Bailey</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
