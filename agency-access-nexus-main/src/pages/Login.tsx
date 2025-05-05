
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      // Error is handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample login credentials for demo purposes
  const sampleCredentials = [
    { role: 'Manager', email: 'manager@naas.com', password: 'password' },
    { role: 'Delivery', email: 'delivery@naas.com', password: 'password' },
    { role: 'Customer', email: 'customer@naas.com', password: 'password' },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-naas-800">NAAS</h1>
          <h2 className="mt-2 text-lg font-medium text-gray-600">Newspaper Agency Automation System</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-naas-600 hover:text-naas-800">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button className="w-full bg-naas-600 hover:bg-naas-700" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-naas-600 hover:text-naas-800">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">Demo Credentials</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {sampleCredentials.map((cred, idx) => (
              <div
                key={idx}
                className="cursor-pointer rounded-md border border-gray-300 bg-white p-3 text-center shadow-sm hover:bg-gray-50"
                onClick={() => {
                  setEmail(cred.email);
                  setPassword(cred.password);
                }}
              >
                <div className="text-xs font-medium text-gray-500">{cred.role}</div>
                <div className="mt-1 text-sm font-medium text-gray-700">{cred.email}</div>
                <div className="text-sm text-gray-500">password: "password"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
