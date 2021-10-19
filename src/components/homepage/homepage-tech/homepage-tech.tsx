import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import Image from 'next/image';
import React from 'react';

const HomepageTech = () => {
	return (
		<section>
			<Container>
				<FlexContainer>
					<FlexItem>
						<Image
							src="/react-logo.svg"
							alt="React Logo"
							width={100}
							height={100}
						/>
					</FlexItem>
					<FlexItem>
						<Image
							src="/golang-logo.svg"
							alt="React Logo"
							width={100}
							height={100}
						/>
					</FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
					<FlexItem></FlexItem>
				</FlexContainer>
			</Container>
		</section>
	);
};

export default HomepageTech;
