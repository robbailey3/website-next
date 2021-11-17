import Container from '@/components/common/layout/container/container';
import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import Navigation from '../navigation/navigation';
import styles from './header.module.scss';

const Header = () => {
  const auth = useUser();

  return (
    <header className={styles.header}>
      <a href="#main-content" id="skip-to-content">
        Skip to Content
      </a>
      <Container className={styles.header__container}>
        {auth.user && <span>Logged in as {auth.user?.name}</span>}
        <Navigation></Navigation>
      </Container>
    </header>
  );
};

export default Header;
