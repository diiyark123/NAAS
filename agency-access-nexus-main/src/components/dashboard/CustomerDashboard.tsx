import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Bell } from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  
  const subscriptions = [
    {
      id: 1,
      publication: 'Daily Tribune',
      plan: 'Monthly',
      price: '$24.99/month',
      status: 'active',
      nextDelivery: 'Tomorrow',
    },
    {
      id: 2,
      publication: 'Sunday Magazine',
      plan: 'Weekly',
      price: '$5.99/week',
      status: 'active',
      nextDelivery: '5 days',
    },
    {
      id: 3,
      publication: 'Business Weekly',
      plan: 'Monthly',
      price: '$19.99/month',
      status: 'paused',
      nextDelivery: 'Paused',
    },
  ];

  const recentPayments = [
    {
      id: 1,
      date: '2023-04-15',
      amount: '$24.99',
      method: 'Credit Card',
      status: 'successful',
    },
    {
      id: 2,
      date: '2023-04-08',
      amount: '$5.99',
      method: 'Credit Card',
      status: 'successful',
    },
    {
      id: 3,
      date: '2023-03-15',
      amount: '$24.99',
      method: 'Credit Card',
      status: 'successful',
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Subscriptions</CardTitle>
          <CardDescription>Your active and paused subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`rounded-lg border p-4 ${
                  sub.status === 'paused' ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{sub.publication}</h4>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      sub.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {sub.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="mt-2 flex flex-col space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Plan:</span> {sub.plan}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Price:</span> {sub.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Next Delivery:</span> {sub.nextDelivery}
                  </p>
                </div>
                <div className="mt-3 flex justify-end">
                  {sub.status === 'active' ? (
                    <Button size="sm" variant="outline" className="mr-2">
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="mr-2">
                      Resume
                    </Button>
                  )}
                  <Button size="sm" className="bg-naas-600 hover:bg-naas-700">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <p className={`text-xs ${
                      payment.status === 'successful' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {payment.status === 'successful' ? 'Successful' : 'Failed'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                className="w-full bg-naas-600 hover:bg-naas-700"
                onClick={() => navigate('/payments')}
              >
                <Calendar className="mr-2 h-4 w-4" /> View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-naas-600 hover:bg-naas-700"
              onClick={() => navigate('/subscriptions')}
            >
              <Mail className="mr-2 h-4 w-4" /> Add New Subscription
            </Button>
            <Button 
              className="w-full bg-naas-600 hover:bg-naas-700"
              onClick={() => navigate('/service-requests')}
            >
              <Bell className="mr-2 h-4 w-4" /> Report Delivery Issue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
