import AdminDashboard from '@/features/admin/components/admin-dashboard/admin-dashboard';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const AdminPage = () => {
  return <AdminDashboard />;
};

export default withPageAuthRequired(AdminPage);
