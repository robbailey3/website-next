import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import React from 'react';
import Image from 'next/image';
import styles from './homepage-info.module.scss';

const HomepageInfo = () => {
	return (
		<section className={styles.info}>
			<Container>
				<FlexContainer options={{ align: 'center', wrap: 'wrap' }}>
					<FlexItem options={{ basis: '50%' }} className={styles.left}>
						<p>I am a Software Engineer working for a company called Netcall.</p>
						<p>I mainly work with Vue.js but I also do some work in C#.</p>
						<p>
							My favourite front-end framework is Angular but I&apos;ve also used React. I also like to build apps with
							Node.js.
						</p>
						<p>I&apos;m always wanting to learn something new and I&apos;m currently learning Go.</p>
					</FlexItem>
					<FlexItem options={{ basis: '50%' }} className={styles.right}>
						<div className={styles.image_container}>
							<Image src={'/me.png'} width={360} height={540} alt="Rob Bailey"></Image>
						</div>
					</FlexItem>
				</FlexContainer>
			</Container>
		</section>
	);
};

export default HomepageInfo;
