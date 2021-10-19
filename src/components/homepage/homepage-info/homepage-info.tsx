import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import React from 'react';
import styles from './homepage-info.module.scss';

const HomepageInfo = () => {
	return (
		<section className={styles.info}>
			<Container>
				<FlexContainer options={{ align: 'center', wrap: 'wrap' }}>
					<FlexItem
						options={{ basis: '50%' }}
						className={styles.left}
					>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Officiis quos sit reprehenderit veritatis
							placeat culpa laboriosam omnis quaerat, vel aperiam,
							quia modi quidem maiores optio labore mollitia ipsa
							a consequatur.
						</p>
					</FlexItem>
					<FlexItem
						options={{ basis: '50%' }}
						className={styles.right}
					>
						<img
							src="https://via.placeholder.com/200x400"
							alt="placeholder"
						/>
					</FlexItem>
				</FlexContainer>
			</Container>
		</section>
	);
};

export default HomepageInfo;
