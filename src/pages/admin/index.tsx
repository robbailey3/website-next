import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import Container from '@/components/common/Container/Container';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';

const AdminPage = () => {
  const user = useUser();
  return (
    <Container>
      <Head>
        <title>Admin / Rob Bailey</title>
      </Head>
      <Breadcrumbs />
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </Container>
  );
};

export default withPageAuthRequired(AdminPage);
