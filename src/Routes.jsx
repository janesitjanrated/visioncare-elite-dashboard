import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import OwnerDashboard from "pages/owner-dashboard";
import FinancialReportingAccounting from "pages/financial-reporting-accounting";
import InventoryStockManagement from "pages/inventory-stock-management";
import PatientManagement from "pages/patient-management";
import StaffDashboard from "pages/staff-dashboard";
import BranchTenantManagement from "pages/branch-tenant-management";
import CommunityFeed from "pages/community-feed";
import ConfigPage from "pages/config";
import LoansManagement from "pages/loans-management";
import NotFound from "pages/NotFound";
import CommunityFeedFullPage from './pages/community-feed/[id]';

// Auth pages
import Login from "pages/auth/Login";
import Signup from "pages/auth/Signup";
import Profile from "pages/auth/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Dashboard routes (development mode - accessible without auth) */}
        <Route path="/" element={<OwnerDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/financial-reporting-accounting" element={<FinancialReportingAccounting />} />
        <Route path="/inventory-stock-management" element={<InventoryStockManagement />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/branch-tenant-management" element={<BranchTenantManagement />} />
        <Route path="/community-feed" element={<CommunityFeed />} />
        <Route path="/community-feed/:id" element={<CommunityFeedFullPage posts={[]} />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/loans-management" element={<LoansManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;