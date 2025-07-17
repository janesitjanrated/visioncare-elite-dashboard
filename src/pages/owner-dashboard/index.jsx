import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import QuickActionCard from './components/QuickActionCard';
import RecentActivity from './components/RecentActivity';
import FinancialOverview from './components/FinancialOverview';
import AlertsNotifications from './components/AlertsNotifications';

const OwnerDashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Mock user data
  const user = {
    id: 1,
    name: "Dr. Michael Rodriguez",
    email: "michael.rodriguez@clinicvision.com",
    role: "owner",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Mock branches data
  const branches = [
    {
      id: 1,
      name: "Downtown Vision Center",
      address: "123 Main St, Downtown",
      status: "active"
    },
    {
      id: 2,
      name: "Westside Optical",
      address: "456 West Ave, Westside",
      status: "active"
    },
    {
      id: 3,
      name: "Northgate Eye Care",
      address: "789 North Blvd, Northgate",
      status: "active"
    }
  ];

  // Set default branch on load
  useEffect(() => {
    if (branches.length > 0 && !selectedBranch) {
      setSelectedBranch(branches[0]);
    }
  }, [branches, selectedBranch]);

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  // KPI data
  const kpiData = [
    {
      title: "Today\'s Revenue",
      value: "$2,450",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Patient Appointments",
      value: "24",
      change: "+8.3%",
      changeType: "positive",
      icon: "Calendar",
      color: "primary"
    },
    {
      title: "Inventory Alerts",
      value: "3",
      change: "-2",
      changeType: "negative",
      icon: "AlertTriangle",
      color: "warning"
    },
    {
      title: "Staff Productivity",
      value: "94%",
      change: "+2.1%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "accent"
    }
  ];

  // Quick actions data
  const quickActions = [
    {
      title: "Patient Management",
      description: "Add new patients, view records, and manage appointments",
      icon: "Users",
      route: "/patient-management",
      color: "primary"
    },
    {
      title: "Inventory Control",
      description: "Monitor stock levels, process orders, and manage suppliers",
      icon: "Package",
      route: "/inventory-stock-management",
      color: "accent",
      badge: "3"
    },
    {
      title: "Financial Reports",
      description: "Access comprehensive financial analytics and accounting",
      icon: "BarChart3",
      route: "/financial-reporting-accounting",
      color: "success"
    },
    {
      title: "Branch Management",
      description: "Oversee multiple locations and tenant operations",
      icon: "Building2",
      route: "/branch-tenant-management",
      color: "warning"
    }
  ];

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
        sidebarExpanded ? 'lg:pl-60' : 'lg:pl-16'
      }`}>
        <div className="p-6 space-y-6 bg-white">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Owner Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user.name}. Here's what's happening at {selectedBranch?.name || 'your clinic'} today.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <FinancialOverview />
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  route={action.route}
                  color={action.color}
                  badge={action.badge}
                />
              ))}
            </div>
          </div>

          {/* Activity and Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RecentActivity />
            <AlertsNotifications />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;