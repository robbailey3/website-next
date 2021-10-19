import Container from '@/components/common/layout/container/container';
import React from 'react';
import Navigation from '../navigation/navigation';
import styles from './header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<a href="#main-content" id="skip-to-content">
				Skip to Content
			</a>
			<Container className={styles.header__container}>
				<Navigation></Navigation>
			</Container>
		</header>
	);
};

export default Header;
