import Container from '@/components/common/Container/Container';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header data-cy="header" className="py-4 bg-white shadow-md">
      <Container className="flex justify-between items-center relative">
        <div>
          <span className="text-2xl md:text-4xl lg:text-6xl font-extrabold block">
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
