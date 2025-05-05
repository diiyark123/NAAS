
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, this would be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "If an account exists with this email, you'll receive reset instructions.",
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-naas-800">NAAS</h1>
          <h2 className="mt-2 text-lg font-medium text-gray-600">
            Newspaper Agency Automation System
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted
                ? "Reset instructions have been sent to your email"
                : "Enter your email to receive password reset instructions"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted ? (
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
                <Button
                  className="w-full bg-naas-600 hover:bg-naas-700"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
                </Button>
              </form>
            </CardContent>
          ) : (
            <CardContent>
              <div className="flex flex-col items-center space-y-4 py-4 text-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  We've sent reset instructions to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  (Note: In this demo, no actual email is sent)
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmail("");
                    setIsSubmitted(false);
                  }}
                >
                  Try another email
                </Button>
              </div>
            </CardContent>
          )}
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-naas-600 hover:text-naas-800">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
