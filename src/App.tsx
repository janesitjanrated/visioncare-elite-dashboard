
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
