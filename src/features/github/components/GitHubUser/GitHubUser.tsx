import { GetUserResponse } from '@/services/github/responses/GetUserResponse';
import GitHubAvatarImage from '../GitHubAvatarImage/GitHubAvatarImage';
import GitHubUserDetails from '../GitHubUserDetails/GitHubUserDetails';

export interface GitHubUserProps {
  user: GetUserResponse;
}

const GitHubUser = (props: GitHubUserProps) => {
  const { user } = props;

  return (
    <>
      <section className="flex flex-wrap justify-center my-8">
        <GitHubAvatarImage avatarUrl={user.avatar_url} />
        <GitHubUserDetails user={user} />
      </section>
    </>
  );
};

export default GitHubUser;
