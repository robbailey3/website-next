import Container from '@/components/common/layout/container/container';
import AdminDashboard from '@/features/admin/components/admin-dashboard/admin-dashboard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AdminPage = () => {
  return (
    <Container>
      <AdminDashboard />
    </Container>
  );
};

export default withPageAuthRequired(AdminPage);
