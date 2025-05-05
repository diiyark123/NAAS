import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const Subscriptions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState([]);

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user?.id);

    if (error) {
      toast({ title: 'Error fetching subscriptions', description: error.message });
    } else {
      setSubscriptions(data || []);
    }
  };

  useEffect(() => {
    if (user?.id) fetchSubscriptions();
  }, [user]);

  const handleSubscriptionAction = async (action: 'pause' | 'resume', subscriptionId: string) => {
    if (!user) {
      toast({
        title: 'Unauthorized',
        description: 'You must be logged in to manage subscriptions.',
      });
      return;
    }

    const newStatus = action === 'pause' ? 'paused' : 'active';

    const { error } = await supabase
      .from('subscriptions')
      .update({ status: newStatus })
      .eq('id', subscriptionId)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: `Error ${action === 'pause' ? 'pausing' : 'resuming'} subscription`,
        description: error.message,
      });
    } else {
      toast({
        title: `Subscription ${action === 'pause' ? 'Paused' : 'Resumed'}`,
        description: `Your subscription has been successfully ${action === 'pause' ? 'paused' : 'resumed'}.`,
      });
      fetchSubscriptions(); // refresh the list
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Subscriptions</h1>
          <p className="text-sm text-gray-500">Manage your active and paused subscriptions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Subscriptions</CardTitle>
            <CardDescription>View and manage your subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions.length === 0 ? (
                <p className="text-gray-500 text-sm">No active subscriptions found.</p>
              ) : (
                subscriptions.map((sub: any) => (
                  <div key={sub.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{sub.plan_name}</h4>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          sub.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Price: ${sub.amount}/month</p>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      {sub.status === 'active' ? (
                        <Button
                          variant="outline"
                          onClick={() => handleSubscriptionAction('pause', sub.id)}
                        >
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={() => handleSubscriptionAction('resume', sub.id)}>
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
