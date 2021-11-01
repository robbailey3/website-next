import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.content}>
        <FlexContainer
          options={{ align: 'center', justify: 'space-around', wrap: 'wrap' }}
        >
          <FlexItem
            options={{
              grow: 0,
              shrink: 0,
              basis: 'clamp(200px, 33.33%, 600px)',
            }}
          >
            <div className={styles.nav}>
              <nav>
                <ul>
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/github">
                      <a>GitHub</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects">
                      <a>Projects</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cv">
                      <a>CV</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </FlexItem>
          <FlexItem
            options={{
              grow: 0,
              shrink: 0,
              basis: 'clamp(300px, 33.33%, 600px)',
            }}
          >
            <div className={styles.social}>
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
          </FlexItem>
          <FlexItem
            options={{
              grow: 0,
              shrink: 0,
              basis: 'clamp(300px, 33.33%, 600px)',
            }}
          >
            <div className={styles.about}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorem sit maiores, ut assumenda explicabo eos eligendi vel
                eius nostrum perspiciatis voluptatem rem alias? Alias doloremque
                maxime iste a non odio?
              </p>
            </div>
          </FlexItem>
        </FlexContainer>
        <div className={styles.attribution}>
          <p className="monospace">Designed and built by Rob Bailey</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
