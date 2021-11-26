import Container from '@/components/common/layout/container/container';
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-background-300 shadow-inner py-12 text-center"
      data-cy="footer"
    >
      <Container className="px-8">
        <div data-cy="footerSocialMenu">
          <ul>
            <li className="inline-block">
              <a
                className="block mr-4 text-4xl duration-200 p-2 hover:text-accent"
                href="https://www.linkedin.com/in/robbailey3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
              </a>
            </li>
            <li className="inline-block">
              <a
                className="block mr-4 text-4xl duration-200 p-2 hover:text-accent"
                href="https://github.com/robbailey3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
              </a>
            </li>
            <li className="inline-block">
              <a
                className="block mr-4 text-4xl duration-200 p-2 hover:text-accent"
                href="https://twitter.com/rob_bailey3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </a>
            </li>
            <li className="inline-block">
              <a
                className="block mr-4 text-4xl duration-200 p-2 hover:text-accent"
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
        <div className="max-w-lg my-12 mx-auto" data-cy="footerGetInTouch">
          <h4 className="text-accent">Contact Me</h4>
          <p>
            If you have any questions or just want to say hello, please get in
            touch.
          </p>
          <div>
            <a className="border-2 border-accent py-2 px-8 duration-300 inline-block  cursor-pointer my-8 hover:bg-accent hover:text-font-dark focus:bg-accent focus:text-font-dark">
              Say Hello
            </a>
          </div>
        </div>
        <div
          className="text-accent text-sm opacity-80"
          data-cy="footerAttribution"
        >
          <p className="monospace">Created by Rob Bailey</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
