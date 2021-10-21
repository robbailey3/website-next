import GithubRepositories from '@/components/github/github-repositories/github-repositories';
import GithubUserDetails from '@/components/github/github-user-details/github-user-details';
import githubService from '@/services/github/github.service';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import { GetUserResponse } from '@/services/github/responses/GetUserResponse';
import React, { useEffect, useState } from 'react';

const GitHubPage = () => {
	const [repos, setRepos] = useState<GetUserRepositoriesResponse[]>();
	const [user, setUser] = useState<GetUserResponse>();

	const [username, setUsername] = useState('robbailey3');

	useEffect(() => {
		const fetchRepos = async () => {
			let result = await githubService.GetUserRepositories(username, { per_page: 25 });
			setRepos(result);
		};
		const fetchUser = async () => {
			let result = await githubService.GetUser(username);
			setUser(result);
		};
		fetchRepos();
		fetchUser();
	}, []);

	if (!repos || !user) {
		return <div>Loading...</div>;
	}
	return (
		<div className="github-page">
			<GithubUserDetails user={user} />
			<GithubRepositories repos={repos} />
		</div>
	);
};

export default GitHubPage;
