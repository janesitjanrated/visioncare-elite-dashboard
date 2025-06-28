
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import Dashboard from "./pages/Dashboard";
import NewPatient from "./pages/NewPatient";
import Patients from "./pages/Patients";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import LensOrders from "./pages/LensOrders";
import PendingGlasses from "./pages/PendingGlasses";
import Claims from "./pages/Claims";
import Assembly from "./pages/Assembly";
import Finance from "./pages/Finance";
import Payroll from "./pages/Payroll";
import Employees from "./pages/Employees";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="min-h-screen flex w-full">
                  <Sidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/appointments" element={<Dashboard />} />
                      <Route path="/new-patient" element={<NewPatient />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/lens-orders" element={<LensOrders />} />
                      <Route path="/pending-glasses" element={<PendingGlasses />} />
                      <Route path="/claims" element={<Claims />} />
                      <Route path="/assembly" element={<Assembly />} />
                      <Route path="/finance" element={<Finance />} />
                      <Route path="/payroll" element={<Payroll />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
