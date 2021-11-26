import Container from '@/components/common/layout/container/container';
import React from 'react';
import Navigation from '../navigation/navigation';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-background-400 z-50">
      <a href="#main-content" id="skip-to-content">
        Skip to Content
      </a>
      <Container className="flex">
        <Navigation></Navigation>
      </Container>
    </header>
  );
};

export default Header;
