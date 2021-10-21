import axios, { AxiosResponse } from 'axios';
import { GetUserRepositoriesResponse } from './responses/GetUserRepositoriesResponse';
import { GetUserResponse } from './responses/GetUserResponse';

type GetUserRepositoriesOptions = {
	sort?: 'created' | 'updated' | 'pushed' | 'full_name';
	order?: 'asc' | 'desc';
	page?: number;
	per_page?: number;
};

class GitHubService {
	private readonly API_BASE = 'https://api.github.com';

	private axiosInstance = axios.create({
		headers: { Accept: 'application/vnd.github.v3+json' },
	});

	public async GetUserRepositories(
		user: string,
		options: GetUserRepositoriesOptions = {
			sort: 'created',
			order: 'desc',
			page: 1,
			per_page: 25,
		}
	): Promise<GetUserRepositoriesResponse[]> {
		const url = `${this.API_BASE}/users/${user}/repos`;
		const response = await this.axiosInstance.get<
			any,
			AxiosResponse<GetUserRepositoriesResponse[]>
		>(url, { params: { ...options } });
		return response.data;
	}

	public async GetUser(username: string): Promise<GetUserResponse> {
		const url = `${this.API_BASE}/users/${username}`;
		const response = await this.axiosInstance.get<
			any,
			AxiosResponse<GetUserResponse>
		>(url);
		return response.data;
	}
}

export default new GitHubService();
