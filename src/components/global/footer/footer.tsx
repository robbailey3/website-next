import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
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
      className="bg-background-600 border-t border-secondary-200 shadow-inner py-12 z-10 relative"
      data-cy="footer"
    >
      <Container>
        <FlexContainer className="space-x-8 items-start flex-wrap">
          <div data-cy="footerGetInTouch">
            <h3 className="text-secondary-200">Say Hello</h3>

            <a
              href="mailto:rob.bailey3+website-contact@gmail.com"
              className="p-2 text-center rounded bg-secondary-500 my-2 inline-block"
            >
              Send me an email
            </a>
          </div>
          <div data-cy="footerSocialMenu">
            <h3 className="text-secondary-200">Find me on</h3>
            <ul>
              <li>
                <a href="https://github.com/robbailey3">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/robbailey3/">LinkedIn</a>
              </li>
              <li>
                <a href="https://twitter.com/rob_bailey3">Twitter</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/users/7959497/rob-bailey">
                  Stack Overflow
                </a>
              </li>
            </ul>
          </div>
        </FlexContainer>
        <div className="font-mono my-4">
          <p className="text-secondary-200">
            Created by Rob Bailey using some code
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
