import { GetUserResponse } from '@/services/github/responses/GetUserResponse';

export interface GitHubUserDetailsProps {
  user: GetUserResponse;
}

const GitHubUserDetails = (props: GitHubUserDetailsProps) => {
  const { user } = props;

  return (
    <>
      <section className="flex flex-wrap justify-center my-8">
        <div className="w-full text-center my-4">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold"
          >
            @{user.login}
          </a>
        </div>
        <div className="flex mt-8 mb-4 flex-wrap justify-center">
          <div className="mr-4 mb-4">
            <span className="font-bold">Name: </span>
            {user.name}
          </div>
          {user.company && (
            <div className="mr-4 mb-4">
              <span className="font-bold">Company: </span>
              {user.company}
            </div>
          )}
          <div className="mr-4 mb-4">
            <span className="font-bold">Location: </span>
            {user.location}
          </div>
          {user.twitter_username && (
            <div className="mr-4 mb-4">
              <span className="font-bold">Twitter Username: </span>
              <a href={`https://twitter.com/${user.twitter_username}`}>
                {user.twitter_username}
              </a>
            </div>
          )}
          {user.blog && (
            <div className="mr-4 mb-4">
              <span className="font-bold">Blog: </span>
              <a href={user.blog} rel="noopener noreferrer" target="_blank">
                {user.blog}
              </a>
            </div>
          )}
          <div className="mr-4 mb-4">
            <span className="font-bold">Followers: </span>
            {user.followers}
          </div>
        </div>
        <div className="text-center w-full">
          {/* TODO: Sanitize this shit */}
          <p dangerouslySetInnerHTML={{ __html: user.bio }}></p>
        </div>
      </section>
    </>
  );
};

export default GitHubUserDetails;
