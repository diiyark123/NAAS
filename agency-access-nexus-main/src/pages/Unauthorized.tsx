
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-naas-800">Access Denied</h1>
          <h2 className="mt-2 text-lg font-medium text-gray-600">
            You don't have permission to access this page
          </h2>
        </div>
        
        <div className="mt-8 space-y-4">
          <p className="text-gray-600">
            Your current role ({user?.role}) doesn't have the necessary permissions to view this resource.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
