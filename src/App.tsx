
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import MainMenu from "./pages/MainMenu";
import Finance from "./pages/Finance";
import Appointments from "./pages/Appointments";
import HRDashboard from "./pages/HRDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="patients" element={<div className="p-8 text-center text-gray-600">Patient Intelligence Page - Coming Soon</div>} />
              <Route path="scheduling" element={<div className="p-8 text-center text-gray-600">Smart Scheduling Page - Coming Soon</div>} />
              <Route path="doctors" element={<div className="p-8 text-center text-gray-600">Doctor Performance Page - Coming Soon</div>} />
              <Route path="treatments" element={<div className="p-8 text-center text-gray-600">Treatment Outcomes Page - Coming Soon</div>} />
              <Route path="revenue" element={<div className="p-8 text-center text-gray-600">Revenue Analytics Page - Coming Soon</div>} />
              <Route path="quality" element={<div className="p-8 text-center text-gray-600">Quality Metrics Page - Coming Soon</div>} />
              <Route path="reports" element={<div className="p-8 text-center text-gray-600">Business Reports Page - Coming Soon</div>} />
              
              {/* Appointment System Routes */}
              <Route path="appointments/*" element={<Appointments />} />
              
              {/* HR/OD System Routes */}
              <Route path="hr-dashboard/*" element={<HRDashboard />} />
              
              {/* Branch System Routes */}
              <Route path="branch" element={<div className="p-8 text-center text-gray-600">Branch Management Page - Coming Soon</div>} />
              
              {/* Feedback System Routes */}
              <Route path="feedback" element={<div className="p-8 text-center text-gray-600">Feedback Page - Coming Soon</div>} />
              
              {/* Finance System Routes */}
              <Route path="finance/*" element={<Finance />} />
              
              {/* Chat System Routes */}
              <Route path="alerts" element={<div className="p-8 text-center text-gray-600">Chat System Page - Coming Soon</div>} />
            </Route>
            <Route path="/main-menu" element={<MainMenu />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
