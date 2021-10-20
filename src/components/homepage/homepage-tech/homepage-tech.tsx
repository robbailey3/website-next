import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import Image from 'next/image';
import React from 'react';
import styles from './homepage-tech.module.scss';

const HomepageTech = () => {
	return (
		<section className={styles.section}>
			<Container>
				<FlexContainer options={{ justify: 'space-around' }}>
					<FlexItem className={styles.tech_item}>
						<Image src="/react-logo.svg" alt="React Logo" width={100} height={100} />
					</FlexItem>
					<FlexItem className={styles.tech_item}>
						<Image src="/golang-logo.svg" alt="React Logo" width={100} height={100} />
					</FlexItem>
					<FlexItem className={styles.tech_item}>
						<Image src="/typescript-logo.svg" alt="React Logo" width={100} height={100} />
					</FlexItem>
					<FlexItem className={styles.tech_item}>
						<Image src="/csharp-logo.svg" alt="React Logo" width={100} height={100} />
					</FlexItem>
				</FlexContainer>
			</Container>
		</section>
	);
};

export default HomepageTech;
