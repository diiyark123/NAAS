import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Subscriptions from './pages/Subscriptions';
import Payments from './pages/Payments';
import ServiceRequests from './pages/ServiceRequests';
import Reports from '@/pages/manager/reports'; // adjust path if needed
import StaffManagementPage from "@/pages/manager/StaffManagementPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              } 
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes for all authenticated users */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* Manager-specific routes */}
            {/* <Route 
              path="/staff" 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <div>Staff Management</div>
                </ProtectedRoute>
              } 
              
            /> */}
            <Route path="/manager/StaffManagementPage" element={<StaffManagementPage />} />

            <Route 
              path="/customers" 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <div>Customer Management</div>
                </ProtectedRoute>
              } 
            />
            {<Route path="/manager/reports" element={<Reports />} />

            /* <Route 
              path="/reports" 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <div>Reports</div>
                </ProtectedRoute>
              } 
            /> */}

            {/* Delivery personnel routes */}
            <Route 
              path="/deliveries" 
              element={
                <ProtectedRoute allowedRoles={['manager', 'delivery']}>
                  <div>Delivery Schedule</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/commissions" 
              element={
                <ProtectedRoute allowedRoles={['manager', 'delivery']}>
                  <div>Commissions</div>
                </ProtectedRoute>
              } 
            />

            {/* Customer routes */}
            <Route 
              path="/subscriptions" 
              element={
                <ProtectedRoute allowedRoles={['manager', 'customer']}>
                  <Subscriptions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payments" 
              element={
                <ProtectedRoute allowedRoles={['manager', 'customer']}>
                  <Payments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/service-requests" 
              element={
                <ProtectedRoute allowedRoles={['manager', 'customer']}>
                  <ServiceRequests />
                </ProtectedRoute>
              } 
            />

            {/* Common protected routes */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <div>Settings</div>
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
