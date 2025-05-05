import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import html2pdf from 'html2pdf.js';

const ReportsPage: React.FC = () => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const element = pdfRef.current;
    if (!element) return;

    const opt = {
      margin:       0.5,
      filename:     'Monthly_Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  const stats = [
    { name: 'Total Customers', value: '2,452' },
    { name: 'Active Subscriptions', value: '1,893' },
    { name: 'Delivery Personnel', value: '42' },
    { name: 'Service Requests', value: '18' },
  ];

  const recentActivities = [
    { title: 'New Customer Registration', time: '2 hours ago', description: 'John Smith registered.' },
    { title: 'Subscription Plan Change', time: '4 hours ago', description: 'Sarah Johnson updated plan.' },
    { title: 'Delivery Issue Reported', time: '1 day ago', description: 'Missing newspaper report.' },
    { title: 'Staff Schedule Updated', time: '2 days ago', description: 'Delivery schedules updated.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Button onClick={handleDownload}>Download PDF</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary Report</CardTitle>
          <CardDescription>Detailed snapshot of system metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={pdfRef} className="p-6 bg-white text-black space-y-6">
            <h1 className="text-3xl font-bold">Monthly Summary Report</h1>

            <section className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="border p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium">{stat.name}</h2>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-6">Recent Activities</h2>
              <ul className="space-y-4 mt-2">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
