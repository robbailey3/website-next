import Container from '@/components/common/layout/container/container';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomepageContact = () => {
  return (
    <section data-cy="homepageContact">
      <Container>
        <h2>Contact</h2>
        <h3>Email</h3>
        <p>
          <a href="mailto:rob.bailey3@gmail.com">rob.bailey3@gmail.com</a>
        </p>
        <h3>Social</h3>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/robbailey3/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default HomepageContact;
