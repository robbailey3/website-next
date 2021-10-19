import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
	return (
		<FlexContainer>
			<FlexItem options={{ grow: 1 }} className="flex-item">
				<h1>Hello One</h1>
			</FlexItem>
			<FlexItem options={{ grow: 3 }} className="flex-item">
				<h1>Hello Two</h1>
			</FlexItem>
			<FlexItem options={{ grow: 1 }} className="flex-item">
				<h1>3</h1>
			</FlexItem>
			<FlexItem options={{ grow: 2 }} className="flex-item">
				<h1>4</h1>
			</FlexItem>
		</FlexContainer>
	);
};

export default Home;
