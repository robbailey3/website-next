import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';

const AdminPage = () => {
  return <p>Not implemented yet</p>;
};

export default withPageAuthRequired(AdminPage);
