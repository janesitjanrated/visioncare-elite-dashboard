import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import TodayAppointments from './components/TodayAppointments';
import PatientSearchBar from './components/PatientSearchBar';
import PendingServices from './components/PendingServices';
import InventoryAlerts from './components/InventoryAlerts';
import QuickActions from './components/QuickActions';
import ShiftInformation from './components/ShiftInformation';
import CommunityFeed from './components/CommunityFeed';
import { useAuth } from '../../contexts/AuthContext';

const StaffDashboard = () => {
  const { user: authUser, userProfile } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Use authenticated user data
  const user = authUser ? {
    id: authUser.id,
    name: authUser.name || userProfile?.name || "Staff User",
    email: authUser.email,
    role: authUser.role || "staff",
    avatar: userProfile?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    employeeId: "CV-ST-001",
    department: "Optometry",
    shift: {
      start: "09:00 AM",
      end: "06:00 PM"
    }
  } : {
    id: 1,
    name: "Demo Staff",
    email: "demo@clinicvision.com",
    role: "staff",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    employeeId: "CV-ST-001",
    department: "Optometry",
    shift: {
      start: "09:00 AM",
      end: "06:00 PM"
    }
  };

  // Mock branches data (staff typically works at one branch)
  const branches = [
    {
      id: 1,
      name: "Main Branch - Downtown",
      address: "123 Vision Street, Downtown",
      status: "active"
    }
  ];

  useEffect(() => {
    // Set default branch for staff
    if (branches.length > 0) {
      setSelectedBranch(branches[0]);
    }
  }, []);

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader
        user={user}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        onToggleSidebar={handleToggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />

      {/* Sidebar */}
      <RoleBasedSidebar
        user={user}
        isExpanded={sidebarExpanded}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarExpanded ? 'lg:ml-60' : 'lg:ml-16'
      }`}>
        <div className="p-6 bg-white">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-semibold text-emerald-400">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  {selectedBranch?.name} • {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Shift</p>
                <p className="font-medium text-foreground">
                  {user.shift.start} - {user.shift.end}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Primary Tasks */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Search */}
              <PatientSearchBar />

              {/* Today's Appointments */}
              <TodayAppointments />

              {/* Pending Services */}
              <PendingServices />

              {/* Community Feed */}
              <CommunityFeed />
            </div>

            {/* Right Column - Secondary Information */}
            <div className="space-y-6">
              {/* Shift Information */}
              <ShiftInformation />

              {/* Quick Actions */}
              <QuickActions />

              {/* Inventory Alerts */}
              <InventoryAlerts />
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Today's Performance Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-blue-800">Patients Served</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-800">Appointments Completed</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-sm text-purple-800">Sales Processed</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">15</p>
                <p className="text-sm text-orange-800">Tasks Completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;