import GitHubRepoList from '@/features/github/components/GitHubRepoList/GitHubRepoList';
import GitHubUser from '@/features/github/components/GitHubUser/GitHubUser';
import githubService from '@/services/github/github.service';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import { GetUserResponse } from '@/services/github/responses/GetUserResponse';
import { NextPageContext } from 'next';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { perPage = 25, page = 1, id } = context.query;

    const user = await githubService.GetUser(id as string);

    const repos = await githubService.GetUserRepositories(id as string, {
      per_page: parseInt(perPage as string, 10),
      page: parseInt(page as string, 10),
    });

    return {
      props: {
        user,
        repos,
      },
    };
  } catch (e: any) {
    Sentry.captureException(e);
    return {
      props: {
        user: null,
        repos: null,
      },
    };
  }
}

const GitHubPage = (props: {
  user: GetUserResponse;
  repos: GetUserRepositoriesResponse[];
}) => {
  const { user, repos } = props;

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!user) {
        router.push('/');
      }
    }
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Rob Bailey: Github Profile - {user.name}</title>
      </Head>
      <GitHubUser user={user} />
      {repos && repos.length > 0 && <GitHubRepoList repos={repos} />}
    </>
  );
};

export default GitHubPage;
