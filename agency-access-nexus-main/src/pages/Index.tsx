
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-naas-800">NAAS</h1>
            <span className="ml-2 text-sm text-gray-600">Newspaper Agency Automation System</span>
          </div>
          <div className="space-x-2">
            {isAuthenticated ? (
              <Button asChild className="bg-naas-600 hover:bg-naas-700">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-naas-600 hover:bg-naas-700">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Streamline Your Newspaper Delivery Operations
              </h1>
              <p className="text-xl text-gray-600">
                A comprehensive solution for newspaper agencies to manage deliveries, subscriptions, and customer relationships in one place.
              </p>
              <div className="space-x-4 pt-4">
                {isAuthenticated ? (
                  <Button asChild size="lg" className="bg-naas-600 hover:bg-naas-700">
                    <Link to="/dashboard">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="bg-naas-600 hover:bg-naas-700">
                      <Link to="/register">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 p-8">
              <div className="aspect-video bg-naas-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-medium">NAAS Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to manage your newspaper delivery business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="rounded-full bg-naas-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-naas-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Separate portals for managers, delivery personnel, and customers with tailored features for each role.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="rounded-full bg-naas-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-naas-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Management</h3>
              <p className="text-gray-600">
                Optimize routes, track deliveries, and manage schedules efficiently for your delivery personnel.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="rounded-full bg-naas-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-naas-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Subscription Management</h3>
              <p className="text-gray-600">
                Easily manage customer subscriptions, billing cycles, and delivery preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join NAAS today and transform how you manage your newspaper delivery operations
          </p>
          {isAuthenticated ? (
            <Button asChild size="lg" className="bg-naas-600 hover:bg-naas-700">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="bg-naas-600 hover:bg-naas-700">
              <Link to="/register">Create Account</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NAAS</h3>
              <p className="text-gray-400">
                Newspaper Agency Automation System - Streamlining newspaper delivery operations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Testimonials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} NAAS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Don't forget to import the icon components
import { Users, Calendar, Mail } from 'lucide-react';

export default Index;
