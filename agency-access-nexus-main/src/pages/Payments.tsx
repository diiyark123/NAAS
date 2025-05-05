import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

type Payment = {
  id: number;
  date: string;
  amount: string;
  method: string;
  status: string;
  name: string;
  email: string;
};

const Payments = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState('');
  const [amount, setAmount] = useState('');
  const [recentPayments, setRecentPayments] = useState<Payment[]>([
    {
      id: 1,
      date: '2025-04-15',
      amount: '₹24.99',
      method: 'Credit Card',
      status: 'successful',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      id: 2,
      date: '2025-04-08',
      amount: '₹5.99',
      method: 'Credit Card',
      status: 'successful',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ]);

  const handlePayNow = () => {
    if (!name || !email || !card || !amount) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all fields to proceed.',
        variant: 'destructive',
      });
      return;
    }

    const newPayment: Payment = {
      id: Date.now(),
      date: new Date().toISOString(),
      amount: `₹${amount}`,
      method: 'Credit Card',
      status: 'successful',
      name,
      email,
    };

    setRecentPayments([newPayment, ...recentPayments]);

    toast({
      title: 'Payment Successful',
      description: `₹${amount} has been paid by ${name}`,
    });

    // Reset fields
    setName('');
    setEmail('');
    setCard('');
    setAmount('');
  };

  return (
    <MainLayout>
      <div className="space-y-6 px-4 lg:px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-naas-900">
            Payment History
          </h1>
          <p className="text-sm text-muted-foreground">
            View your past payments and make new payments here.
          </p>
        </div>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your last transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col md:flex-row md:items-center justify-between rounded-lg px-4 py-3 border hover:shadow transition duration-150 bg-muted/20"
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-semibold text-naas-800">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{payment.method}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.name} • {payment.email}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-naas-900">{payment.amount}</p>
                  <p className="text-xs text-green-600">Successful</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <Calendar className="mr-2 h-4 w-4" /> View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Pay Now Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pay Now</CardTitle>
            <CardDescription>Enter details to make a payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="card">Card Details</Label>
                <Input
                  id="card"
                  placeholder="XXXX-XXXX-XXXX-1234"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handlePayNow}>
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Payments;
