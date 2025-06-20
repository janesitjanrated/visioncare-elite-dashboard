
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
              <Route path="doctor/examination" element={<div className="p-8 text-center text-gray-600">ตรวจสายตา / วินิจฉัยโรค - Coming Soon</div>} />
              <Route path="doctor/sales" element={<div className="p-8 text-center text-gray-600">ขายสินค้า - Coming Soon</div>} />
              <Route path="doctor/billing" element={<div className="p-8 text-center text-gray-600">ออกใบสั่งซื้อ / รับชำระ - Coming Soon</div>} />
              <Route path="doctor/claims" element={<div className="p-8 text-center text-gray-600">เคลมสินค้า - Coming Soon</div>} />
              <Route path="doctor/delivery" element={<div className="p-8 text-center text-gray-600">ประกอบ / ส่งของ - Coming Soon</div>} />
              <Route path="doctor/followup" element={<div className="p-8 text-center text-gray-600">Revisit / Follow-up - Coming Soon</div>} />
              <Route path="doctor/examination-form" element={<div className="p-8 text-center text-gray-600">ฟอร์มตรวจสายตา - Coming Soon</div>} />
              <Route path="doctor/prescription" element={<div className="p-8 text-center text-gray-600">หมายเหตุ / ใบ Rx - Coming Soon</div>} />
              
              {/* Owner System Routes (ฝั่งเจ้าของ) */}
              <Route path="owner/dashboard" element={<div className="p-8 text-center text-gray-600">Dashboard เจ้าของ - Coming Soon</div>} />
              <Route path="owner/finance" element={<div className="p-8 text-center text-gray-600">การเงิน / งบ - Coming Soon</div>} />
              <Route path="owner/tax" element={<div className="p-8 text-center text-gray-600">ภาษี - Coming Soon</div>} />
              <Route path="owner/loans" element={<div className="p-8 text-center text-gray-600">เงินกู้ - Coming Soon</div>} />
              <Route path="owner/performance" element={<div className="p-8 text-center text-gray-600">Performance ทีม/สาขา - Coming Soon</div>} />
              <Route path="owner/risks" element={<div className="p-8 text-center text-gray-600">ความเสี่ยง - Coming Soon</div>} />
              <Route path="owner/opportunities" element={<div className="p-8 text-center text-gray-600">โอกาส - Coming Soon</div>} />
              <Route path="owner/assets" element={<div className="p-8 text-center text-gray-600">ทะเบียนทรัพย์สิน - Coming Soon</div>} />
              <Route path="owner/export" element={<div className="p-8 text-center text-gray-600">Export เอกสาร - Coming Soon</div>} />
              <Route path="owner/corporation" element={<div className="p-8 text-center text-gray-600">บริหาร Corporation/สาขา - Coming Soon</div>} />
              <Route path="owner/tax-planning" element={<div className="p-8 text-center text-gray-600">วางแผนภาษี - Coming Soon</div>} />
              <Route path="owner/growth" element={<div className="p-8 text-center text-gray-600">การเติบโต - Coming Soon</div>} />
              
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
