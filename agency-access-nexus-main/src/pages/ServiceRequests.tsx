
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ServiceRequests = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleNewRequest = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Service requests will be enabled after connecting to Supabase.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Requests</h1>
          <p className="text-sm text-gray-500">Submit and track your service requests</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Request</CardTitle>
            <CardDescription>Choose the type of service request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleNewRequest} className="w-full">
              Report Missing Delivery
            </Button>
            <Button onClick={handleNewRequest} className="w-full">
              Change Delivery Address
            </Button>
            <Button onClick={handleNewRequest} className="w-full">
              Request Vacation Hold
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ServiceRequests;
