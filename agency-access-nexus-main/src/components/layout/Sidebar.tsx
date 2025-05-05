
import { NavLink } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Home, Users, Calendar, Settings, Mail, Bell } from 'lucide-react';

const Sidebar = () => {
  const { user, hasRole } = useAuth();

  if (!user) return null;

  // Define navigation items based on user role
  const navItems = getNavItems(user.role);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 overflow-y-auto border-r border-gray-200 bg-white lg:block">
      <div className="flex h-16 flex-shrink-0 items-center px-6">
        <h1 className="text-2xl font-bold text-naas-800">NAAS</h1>
      </div>
      <nav className="mt-5 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  isActive
                    ? 'bg-naas-50 text-naas-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-naas-700',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

// Helper function to get navigation items based on user role
const getNavItems = (role: UserRole) => {
  // Common items for all roles
  const items = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Profile', href: '/profile', icon: Users },
  ];

  // Role-specific items
  if (role === 'manager') {
    items.push(
      { name: 'Staff Management', href: '/manager/StaffManagementPage', icon: Users },
      { name: 'Customer Management', href: '/customers', icon: Users },
      { name: 'Reports', href: '/manager/reports', icon: Calendar },
      { name: 'Settings', href: '/settings', icon: Settings }
    );
  } else if (role === 'delivery') {
    items.push(
      { name: 'Delivery Schedule', href: '/deliveries', icon: Calendar },
      { name: 'Commissions', href: '/commissions', icon: Mail }
    );
  } else if (role === 'customer') {
    items.push(
      { name: 'My Subscriptions', href: '/subscriptions', icon: Mail },
      { name: 'Payments', href: '/payments', icon: Calendar },
      { name: 'Service Requests', href: '/service-requests', icon: Bell }
    );
  }

  return items;
};

export default Sidebar;
