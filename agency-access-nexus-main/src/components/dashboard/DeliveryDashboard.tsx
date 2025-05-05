import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Printer } from 'lucide-react';

interface Delivery {
  id: number;
  customer: string;
  address: string;
  publications: string[];
  status: 'pending' | 'completed';
  is_stopped: boolean;
}

const DeliveryDashboard = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    fetchDeliveries();

    const channel = supabase
  .channel('realtime:deliveries')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'deliveries' },
    (payload) => {
      if ('new' in payload && payload.new && 'id' in payload.new) {
        setDeliveries((prev) =>
          prev.map((d) =>
            d.id === (payload.new as any).id ? { ...d, ...(payload.new as any) } : d
          )
        );
      }
    }
  )
  .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDeliveries = async () => {
    const { data, error } = await supabase.from('deliveries').select('*');
    if (error) {
      console.error('Error fetching deliveries:', error.message);
    } else {
      setDeliveries(data);
    }
  };

  const updateDelivery = async (
    id: number,
    updates: Partial<{ status: string; is_stopped: boolean }>
  ) => {
    const { error } = await supabase.from('deliveries').update(updates).eq('id', id);
    if (error) {
      console.error('Error updating delivery:', error.message);
    }
  };

  const handleMarkComplete = async (id: number) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'completed' } : d))
    );
    await updateDelivery(id, { status: 'completed' });
  };
  

  const handleStopDelivery = async (id: number) => {
    const delivery = deliveries.find((d) => d.id === id);
    if (!delivery) return;
    const updatedStopped = !delivery.is_stopped;

    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, is_stopped: updatedStopped } : d))
    );
    await updateDelivery(id, { is_stopped: updatedStopped });
  };

  

  const handlePrintSchedule = () => {
    const printContent = deliveries
      .map(
        (d) =>
          `Customer: ${d.customer}\nAddress: ${d.address}\nPublications: ${d.publications.join(", ")}\nStatus: ${d.status}$
{d.is_stopped ? ' (Stopped)' : ''}\n\n`
      )
      .join('');
    const newWin = window.open('', '', 'width=800,height=600');
    newWin?.document.write(`<pre>${printContent}</pre>`);
    newWin?.print();
    newWin?.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Today's Delivery Schedule</h1>
        <Button onClick={handlePrintSchedule} className="bg-naas-600 hover:bg-naas-700">
          <Printer className="mr-2 h-4 w-4" /> Print Schedule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule for {new Date().toLocaleDateString()}</CardTitle>
          <CardDescription>Manage customer deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className={`rounded-lg border p-4 ${
                  delivery.status === 'completed'
                    ? 'bg-gray-50'
                    : delivery.is_stopped
                    ? 'bg-red-50'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{delivery.customer}</h4>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      delivery.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : delivery.is_stopped
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {delivery.is_stopped
                      ? 'Stopped'
                      : delivery.status === 'completed'
                      ? 'Completed'
                      : 'Pending'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{delivery.address}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {delivery.publications.map((pub) => (
                    <span
                      key={pub}
                      className="rounded-full bg-naas-100 px-2 py-1 text-xs font-medium text-naas-800"
                    >
                      {pub}
                    </span>
                  ))}
                </div>
                {delivery.status !== 'completed' && !delivery.is_stopped && (
                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStopDelivery(delivery.id)}
                    >
                      Stop Delivery
                    </Button>
                    <Button
                      size="sm"
                      className="bg-naas-600 hover:bg-naas-700"
                      onClick={() => handleMarkComplete(delivery.id)}
                    >
                      Mark Complete
                    </Button>
                  </div>
                )}
                {delivery.is_stopped && (
                  <div className="mt-3 text-right">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleStopDelivery(delivery.id)}
                    >
                      Resume Delivery
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryDashboard;
