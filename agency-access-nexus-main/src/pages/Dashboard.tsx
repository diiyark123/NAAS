
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import ManagerDashboard from '@/components/dashboard/ManagerDashboard';
import DeliveryDashboard from '@/components/dashboard/DeliveryDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Render different dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'manager':
        return <ManagerDashboard />;
      case 'delivery':
        return <DeliveryDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return <div>Unknown Role</div>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user.name}! Here's your {user.role} dashboard.
          </p>
        </div>

        {renderDashboard()}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
