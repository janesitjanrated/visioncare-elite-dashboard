import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import LineWebhookSetup from './components/LineWebhookSetup';
import NewsGenerator from './components/NewsGenerator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConfigPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('line');
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Mock user data
  const user = {
    id: 1,
    name: "Dr. Sarah Chen",
    email: "sarah.chen@eyecare.com",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face"
  };

  // Mock branches data
  const branches = [
    {
      id: 1,
      name: "EyeCare Pro - Main Clinic",
      address: "123 Vision Street, Medical District",
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
      id: 'line',
      label: 'Line Bot Integration',
      icon: 'MessageCircle',
      description: 'Configure Line Bot webhook and messaging settings'
    },
    {
      id: 'generator',
      label: 'AI News Generator',
      icon: 'Bot',
      description: 'Manage automated news generation and content creation'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'line':
        return <LineWebhookSetup />;
      case 'generator':
        return <NewsGenerator />;
      default:
        return <LineWebhookSetup />;
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
                  System Configuration
                </h1>
                <p className="text-muted-foreground">
                  Manage system integrations, automation settings, and external service configurations.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Save" iconPosition="left">
                  Save All Settings
                </Button>
                <Button variant="default" iconName="RefreshCw" iconPosition="left">
                  Test Connections
                </Button>
              </div>
            </div>

            {/* Branch Info */}
            {selectedBranch && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Building2" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Configuring: {selectedBranch.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    • {selectedBranch.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Configuration tabs">
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

          {/* System Status */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">System Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Line Bot Status</span>
                  <span className="text-sm font-medium text-success">Connected</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Webhook is active and responding</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Generator Status</span>
                  <span className="text-sm font-medium text-success">Ready</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">AI service is operational</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfigPage; 