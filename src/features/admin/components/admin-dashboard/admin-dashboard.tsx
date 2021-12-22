import TodoList from '@/features/todo/components/todo-list/todo-list';
import { useUser } from '@auth0/nextjs-auth0';

const AdminDashboard = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Hi {user?.name}</h1>
      <p>Welcome to the admin dashboard</p>
      <TodoList />
    </div>
  );
};

export default AdminDashboard;
