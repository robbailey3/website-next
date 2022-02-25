import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const AdminPage = () => {
  const user = useUser();
  return <pre>{JSON.stringify(user, null, 4)}</pre>;
};

export default withPageAuthRequired(AdminPage);
