import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BusinessOverviewTab from './components/BusinessOverviewTab';
import CustomReportsTab from './components/CustomReportsTab';
import TaxOptimizedTab from './components/TaxOptimizedTab';
import BalanceSheetTab from './components/BalanceSheetTab';
import CashFlowTab from './components/CashFlowTab';
import FinancialMetricsCard from './components/FinancialMetricsCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FinancialReportingAccounting = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Mock user data
  const user = {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@clinicvision.com",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  };

  // Mock branches data
  const branches = [
    {
      id: 1,
      name: "Main Branch - Downtown",
      address: "123 Main St, Downtown",
      status: "active"
    },
    {
      id: 2,
      name: "North Branch - Mall Plaza",
      address: "456 Mall Plaza, North District",
      status: "active"
    },
    {
      id: 3,
      name: "South Branch - Medical Center",
      address: "789 Medical Center Dr, South District",
      status: "active"
    }
  ];

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

  const tabs = [
    {
      id: 'overview',
      label: 'Business Overview',
      icon: 'TrendingUp',
      description: 'Executive dashboard with revenue trends and KPIs'
    },
    {
      id: 'balance-sheet',
      label: 'Balance Sheet',
      icon: 'FileText',
      description: 'Financial position and balance sheet management'
    },
    {
      id: 'cash-flow',
      label: 'Cash Flow',
      icon: 'Activity',
      description: 'Money flow analysis and cash management'
    },
    {
      id: 'reports',
      label: 'Custom Reports',
      icon: 'BarChart3',
      description: 'Generate and manage custom financial reports'
    },
    {
      id: 'tax',
      label: 'Tax-Optimized',
      icon: 'Calculator',
      description: 'Tax compliance and optimization tools'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <BusinessOverviewTab />;
      case 'balance-sheet':
        return <BalanceSheetTab />;
      case 'cash-flow':
        return <CashFlowTab />;
      case 'reports':
        return <CustomReportsTab />;
      case 'tax':
        return <TaxOptimizedTab />;
      default:
        return <BusinessOverviewTab />;
    }
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
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Financial Reporting & Accounting
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive financial oversight with three-tier accounting system for business intelligence, 
                  custom reporting, and tax optimization.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Data
                </Button>
                <Button variant="default" iconName="RefreshCw" iconPosition="left">
                  Sync Financial Data
                </Button>
              </div>
            </div>

            {/* Branch Info */}
            {selectedBranch && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Building2" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Viewing: {selectedBranch.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    • {selectedBranch.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FinancialMetricsCard
              title="Monthly Revenue"
              value="$55,000"
              change="+12.5%"
              trend="up"
              icon="DollarSign"
              description="June 2025 performance"
              color="text-success"
            />
            <FinancialMetricsCard
              title="Net Profit Margin"
              value="29.7%"
              change="+1.2%"
              trend="up"
              icon="Percent"
              description="Above industry average"
              color="text-primary"
            />
            <FinancialMetricsCard
              title="Outstanding Receivables"
              value="$8,500"
              change="-5.3%"
              trend="down"
              icon="Clock"
              description="Improved collection rate"
              color="text-warning"
            />
            <FinancialMetricsCard
              title="Tax Savings YTD"
              value="$28,500"
              change="+18.7%"
              trend="up"
              icon="Shield"
              description="Optimized deductions"
              color="text-accent"
            />
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Financial reporting tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Description */}
            <div className="px-6 py-3 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <QuickActionsPanel />

          {/* Financial Health Indicators */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Financial Health Indicators</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cash Flow Ratio</span>
                  <span className="text-sm font-medium text-success">Excellent</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Strong positive cash flow maintained</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Debt-to-Equity</span>
                  <span className="text-sm font-medium text-success">Good</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Healthy debt management</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expense Control</span>
                  <span className="text-sm font-medium text-warning">Monitor</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Review marketing spend efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialReportingAccounting;