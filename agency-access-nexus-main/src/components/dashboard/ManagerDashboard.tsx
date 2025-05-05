
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Calendar, Bell } from 'lucide-react';

const ManagerDashboard = () => {
  // This would be fetched from API in a real app
  const stats = [
    {
      id: 1,
      name: 'Total Customers',
      value: '2,452',
      icon: Users,
      change: '+4.75%',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Active Subscriptions',
      value: '1,893',
      icon: Mail,
      change: '+1.2%',
      changeType: 'increase',
    },
    {
      id: 3,
      name: 'Delivery Personnel',
      value: '42',
      icon: Users,
      change: '0%',
      changeType: 'neutral',
    },
    {
      id: 4,
      name: 'Service Requests',
      value: '18',
      icon: Bell,
      change: '-2.3%',
      changeType: 'decrease',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New Customer Registration',
      time: '2 hours ago',
      description: 'John Smith registered as a new customer.',
    },
    {
      id: 2,
      title: 'Subscription Plan Change',
      time: '4 hours ago',
      description: 'Sarah Johnson changed her subscription plan.',
    },
    {
      id: 3,
      title: 'Delivery Issue Reported',
      time: '1 day ago',
      description: 'Customer reported missing newspaper delivery.',
    },
    {
      id: 4,
      title: 'Staff Schedule Updated',
      time: '2 days ago',
      description: 'Delivery schedules for the week were updated.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'increase' 
                  ? 'text-green-600' 
                  : stat.changeType === 'decrease' 
                    ? 'text-red-600' 
                    : 'text-gray-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest activity in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{activity.title}</h4>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-naas-600 hover:bg-naas-700">
              <Users className="mr-2 h-4 w-4" /> Manage Staff
            </Button>
            <Button className="w-full bg-naas-600 hover:bg-naas-700">
              <Calendar className="mr-2 h-4 w-4" /> View Delivery Schedule
            </Button>
            <Button className="w-full bg-naas-600 hover:bg-naas-700">
              <Mail className="mr-2 h-4 w-4" /> Manage Subscriptions
            </Button>
            <Button className="w-full bg-naas-600 hover:bg-naas-700">
              <Bell className="mr-2 h-4 w-4" /> Handle Service Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Make sure to import Button
import { Button } from "@/components/ui/button";

export default ManagerDashboard;
