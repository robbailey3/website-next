import Container from '@/components/common/Container/Container';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header
      data-cy="header"
      className="py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50"
    >
      <Container className="flex justify-between items-center relative">
        <div>
          <span className="text-xl md:text-2xl lg:text-4xl font-extrabold block">
            Rob Bailey
          </span>
          <span className="font-mono text-blue-700">Software Engineer</span>
        </div>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
