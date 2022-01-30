import Container from '@/components/common/Container/Container';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import GitHubRepo from '../GitHubRepo/GitHubRepo';

export interface GitHubRepoListProps {
  repos: GetUserRepositoriesResponse[];
}

const GitHubRepoList = (props: GitHubRepoListProps) => {
  const { repos } = props;

  return (
    <Container>
      <section className="flex flex-wrap justify-around items-stretch">
        {repos.map((repo) => (
          <GitHubRepo key={repo.id} repo={repo} />
        ))}
      </section>
    </Container>
  );
};

export default GitHubRepoList;
