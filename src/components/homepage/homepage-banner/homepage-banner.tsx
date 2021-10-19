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
				<h1 className={styles.heading}>Lorem ipsum dolor sit</h1>
				<h2 className={styles.sub_heading}>Blah blah</h2>
			</FlexItem>
			<FlexItem className={styles.right} options={{ basis: '50%' }}>
				<img
					src="https://via.placeholder.com/300x300"
					alt="placeholder"
				/>
			</FlexItem>
		</FlexContainer>
	);
};

export default HomepageBanner;
