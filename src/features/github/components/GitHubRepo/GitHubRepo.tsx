import Tag from '@/components/common/Tag/Tag';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import { faCodeBranch, faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface GitHubRepoProps {
  repo: GetUserRepositoriesResponse;
}

const GitHubRepo = (props: GitHubRepoProps) => {
  const { repo } = props;

  return (
    <div key={repo.id} className="mb-4 basis-full md:basis-1/2 p-4">
      <div className="shadow rounded p-4 h-full flex-col justify-between flex">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl break-all">
            <a href={repo.html_url}>{repo.name}</a>
          </h3>
          <span className="text-gray-600 italic ml-2 text-xs">
            {repo.language && <div>{repo.language}</div>}
          </span>
        </div>
        <div className="my-2">
          {repo.is_template && <Tag variant={'primary'}>Template</Tag>}
          {repo.description && <p>{repo.description}</p>}
        </div>
        <div className="flex items-start flex-wrap my-2">
          {repo.topics.map((topic) => (
            <span className="mr-2 mb-2" key={`${repo.id}_${topic}`}>
              <Tag variant={'primary'}>{topic}</Tag>
            </span>
          ))}
        </div>
        <div className="flex space-x-4 justify-end">
          <div>
            <span className="sr-only">Number of forks: </span>
            <FontAwesomeIcon icon={faCodeBranch} />
            <span className="ml-2">{repo.forks_count}</span>
          </div>
          <div>
            <span className="sr-only">Number of stars: </span>
            <FontAwesomeIcon icon={faStar} />
            <span className="ml-2">{repo.stargazers_count}</span>
          </div>
          <div>
            <span className="sr-only">Repository size: </span>
            <span className="ml-2">{repo.size.toFixed(0)}KB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubRepo;
