import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import React from 'react';
import GithubRepositoryItem from '../github-repository-item/github-repository-item';
import styles from './github-repositories.module.scss';

type GithubRepositoriesProps = {
	repos: GetUserRepositoriesResponse[];
};

const GithubRepositories = (props: GithubRepositoriesProps) => {
	const { repos } = props;
	return (
		<section data-cy="github-repositories" className={styles.repos}>
			<Container>
				<h2>Repositories</h2>
				<FlexContainer
					options={{
						wrap: 'wrap',
						justify: 'space-around',
					}}
				>
					{repos.map((repo) => (
						<FlexItem
							key={repo.id}
							className={styles.repo_item}
							options={{ basis: 'calc(50% - 1rem)' }}
						>
							<GithubRepositoryItem repo={repo} />
						</FlexItem>
					))}
				</FlexContainer>
			</Container>
		</section>
	);
};

export default GithubRepositories;
