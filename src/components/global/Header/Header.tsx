import Container from '@/components/common/Container/Container';
import Link from 'next/link';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header
      data-cy="header"
      className="py-4 bg-white shadow-md fixed top-0 left-0 w-full z-40"
    >
      <Container className="flex justify-between items-center relative">
        <div>
          <Link href="/">
            <a>
              <span className="text-xl md:text-2xl lg:text-4xl font-extrabold block">
                Rob Bailey
              </span>
              <span className="font-mono text-blue-700">Software Engineer</span>
            </a>
          </Link>
        </div>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
