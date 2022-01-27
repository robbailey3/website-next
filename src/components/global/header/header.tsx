import Container from '@/components/common/Container/Container';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header data-cy="header" className="py-4">
      <Container className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold">
            Rob Bailey
          </h1>
          <span className="font-mono text-blue-700">Software Engineer</span>
        </div>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
