import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import styles from './homepage-banner.module.scss';

const HomepageBanner = () => {
	return (
		<FlexContainer
			className={styles.banner}
			options={{ align: 'center', wrap: 'wrap' }}
		>
			<FlexItem className={styles.left} options={{ basis: '50%' }}>
				<h1 className={styles.heading} data-cy="homepage-banner-title">Rob Bailey</h1>
				<h2 className={styles.sub_heading} data-cy="homepage-banner-subtitle">Software Engineer</h2>
			</FlexItem>
			<FlexItem className={styles.right} options={{ basis: '50%' }}>
		<p>Hi there!</p>
		<p>I make things with code.</p>
			</FlexItem>
		</FlexContainer>
	);
};

export default HomepageBanner;
