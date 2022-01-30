import Container from '@/components/common/Container/Container';
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomepageSocial = () => {
  return (
    <section className="my-12">
      <Container>
        <div className="p-4 bg-slate-100 text-center rounded-xl">
          <h2 className="text-gray-800 text-6xl my-8 font-bold">Find Me On</h2>
          <ul className="flex flex-wrap items-center justify-center text-4xl space-x-4">
            <li>
              <a
                href="https://twitter.com/rob_bailey3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 duration-200 hover:text-blue-500"
              >
                <span className="sr-only">Twitter</span>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/robbailey3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 duration-200 hover:text-blue-500"
              >
                <span className="sr-only">Github</span>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/rob-bailey-a8a8b8b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 duration-200 hover:text-blue-500"
              >
                <span className="sr-only">LinkedIn</span>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/robbailey3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 duration-200 hover:text-blue-500"
              >
                <span className="sr-only">Instagram</span>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a
                href="https://stackoverflow.com/users/7959497/rob-bailey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 duration-200 hover:text-blue-500"
              >
                <span className="sr-only">Stack Overflow</span>
                <FontAwesomeIcon icon={faStackOverflow} />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default HomepageSocial;
