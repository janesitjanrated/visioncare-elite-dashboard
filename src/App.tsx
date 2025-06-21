
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
import Branch from "./pages/Branch";
import Feedback from "./pages/Feedback";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import DoctorQueue from "./pages/DoctorQueue";
import DoctorExamination from "./pages/DoctorExamination";
import DoctorSales from "./pages/DoctorSales";
import DoctorBilling from "./pages/DoctorBilling";
import DoctorClaims from "./pages/DoctorClaims";
import DoctorDelivery from "./pages/DoctorDelivery";
import DoctorFollowUp from "./pages/DoctorFollowUp";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerFinance from "./pages/OwnerFinance";
import OwnerTax from "./pages/OwnerTax";
import OwnerLoans from "./pages/OwnerLoans";
import OwnerRisks from "./pages/OwnerRisks";
import OwnerOpportunities from "./pages/OwnerOpportunities";
import OwnerAssets from "./pages/OwnerAssets";
import OwnerPerformance from "./pages/OwnerPerformance";
import OwnerExport from "./pages/OwnerExport";
import OwnerCorporation from "./pages/OwnerCorporation";
import OwnerTaxPlanning from "./pages/OwnerTaxPlanning";
import OwnerGrowth from "./pages/OwnerGrowth";

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
              
              {/* Doctor System Routes (ฝั่งหมอ) */}
              <Route path="doctor/queue" element={<DoctorQueue />} />
              <Route path="doctor/examination" element={<DoctorExamination />} />
              <Route path="doctor/sales" element={<DoctorSales />} />
              <Route path="doctor/billing" element={<DoctorBilling />} />
              <Route path="doctor/claims" element={<DoctorClaims />} />
              <Route path="doctor/delivery" element={<DoctorDelivery />} />
              <Route path="doctor/followup" element={<DoctorFollowUp />} />
              <Route path="doctor/examination-form" element={<div className="p-8 text-center text-gray-600">ฟอร์มตรวจสายตา - Coming Soon</div>} />
              <Route path="doctor/prescription" element={<div className="p-8 text-center text-gray-600">หมายเหตุ / ใบ Rx - Coming Soon</div>} />
              
              {/* Owner System Routes (ฝั่งเจ้าของ) */}
              <Route path="owner/dashboard" element={<OwnerDashboard />} />
              <Route path="owner/finance" element={<OwnerFinance />} />
              <Route path="owner/tax" element={<OwnerTax />} />
              <Route path="owner/loans" element={<OwnerLoans />} />
              <Route path="owner/performance" element={<OwnerPerformance />} />
              <Route path="owner/risks" element={<OwnerRisks />} />
              <Route path="owner/opportunities" element={<OwnerOpportunities />} />
              <Route path="owner/assets" element={<OwnerAssets />} />
              <Route path="owner/export" element={<OwnerExport />} />
              <Route path="owner/corporation" element={<OwnerCorporation />} />
              <Route path="owner/tax-planning" element={<OwnerTaxPlanning />} />
              <Route path="owner/growth" element={<OwnerGrowth />} />
              
              {/* Original System Routes */}
              <Route path="appointments/*" element={<Appointments />} />
              <Route path="hr-dashboard/*" element={<HRDashboard />} />
              <Route path="branch/*" element={<Branch />} />
              <Route path="feedback/*" element={<Feedback />} />
              <Route path="finance/*" element={<Finance />} />
              <Route path="alerts/*" element={<Chat />} />
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
