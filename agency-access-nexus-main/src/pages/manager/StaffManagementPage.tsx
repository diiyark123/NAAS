import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const StaffManagementPage = () => {
  const [deliveryPersonName, setDeliveryPersonName] = useState('');
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    publications: '',
  });

  const [deliveryPeople, setDeliveryPeople] = useState<string[]>([]);
  const [customers, setCustomers] = useState<
    { name: string; address: string; publications: string }[]
  >([]);

  const handleAddDeliveryPerson = () => {
    if (!deliveryPersonName.trim()) {
      toast({ title: 'Failed to add', description: 'Name is required' });
      return;
    }

    setDeliveryPeople((prev) => [...prev, deliveryPersonName.trim()]);
    toast({ title: 'Success', description: 'Delivery person added' });
    setDeliveryPersonName('');
  };

  const handleAddCustomer = () => {
    if (
      !customer.name.trim() ||
      !customer.address.trim() ||
      !customer.publications.trim()
    ) {
      toast({ title: 'Failed to add', description: 'All fields are required' });
      return;
    }

    setCustomers((prev) => [...prev, { ...customer }]);
    toast({ title: 'Success', description: 'Customer details added' });
    setCustomer({ name: '', address: '', publications: '' });
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-naas-800">Staff Management</h1>

      {/* Add Delivery Person Card */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-naas-700">Add Delivery Person</h2>
        <div className="flex gap-3">
          <Input
            placeholder="Full Name"
            value={deliveryPersonName}
            onChange={(e) => setDeliveryPersonName(e.target.value)}
          />
          <Button onClick={handleAddDeliveryPerson}>Add</Button>
        </div>
        {deliveryPeople.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700">Recently Added:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {deliveryPeople.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Add Customer Card */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
        <h2 className="text-xl font-semibold text-naas-700">Add Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <Input
            placeholder="Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
          <Input
            placeholder="Publications"
            value={customer.publications}
            onChange={(e) => setCustomer({ ...customer, publications: e.target.value })}
          />
        </div>
        <Button onClick={handleAddCustomer}>Add Customer</Button>

        {customers.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700">Recently Added Customers:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {customers.map((cust, idx) => (
                <li key={idx}>
                  <span className="font-medium">{cust.name}</span> — {cust.address} — {cust.publications}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagementPage;
