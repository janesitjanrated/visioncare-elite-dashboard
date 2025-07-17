import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BranchDetailsModal = ({ isOpen, onClose, branch }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !branch) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'staff', label: 'Staff', icon: 'Users' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const staffMembers = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Branch Manager', status: 'active', email: 'sarah.johnson@clinic.com' },
    { id: 2, name: 'Mike Chen', role: 'Sales Associate', status: 'active', email: 'mike.chen@clinic.com' },
    { id: 3, name: 'Lisa Rodriguez', role: 'Administrative Assistant', status: 'active', email: 'lisa.rodriguez@clinic.com' },
    { id: 4, name: 'David Kim', role: 'Technician', status: 'on_leave', email: 'david.kim@clinic.com' }
  ];

  const performanceData = [
    { metric: 'Monthly Revenue', current: '$45,230', target: '$50,000', percentage: 90.5 },
    { metric: 'Patient Satisfaction', current: '4.8/5', target: '4.5/5', percentage: 106.7 },
    { metric: 'Appointment Utilization', current: '87%', target: '85%', percentage: 102.4 },
    { metric: 'Inventory Turnover', current: '12.3x', target: '10x', percentage: 123.0 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Branch Name</h4>
            <p className="text-lg font-semibold text-foreground">{branch.name}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
            <p className="text-foreground">{branch.address}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Operating Hours</h4>
            <p className="text-foreground">{branch.operatingHours}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                branch.status === 'active' ? 'bg-success' : 'bg-error'
              }`} />
              <span className="text-foreground capitalize">{branch.status}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Performance Score</h4>
            <p className="text-lg font-semibold text-foreground">{branch.performance}%</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
            <p className="text-foreground">Today at 2:30 PM</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="DollarSign" size={24} className="text-success mx-auto mb-2" />
          <p className="text-xl font-bold text-foreground">${branch.dailyRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Daily Revenue</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-xl font-bold text-foreground">{branch.patientCount}</p>
          <p className="text-xs text-muted-foreground">Patients Today</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="UserCheck" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-xl font-bold text-foreground">{branch.staffCount}</p>
          <p className="text-xs text-muted-foreground">Staff Members</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Package" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-xl font-bold text-foreground">{branch.inventoryItems}</p>
          <p className="text-xs text-muted-foreground">Inventory Items</p>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-4">
      {staffMembers.map((staff) => (
        <div key={staff.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {staff.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{staff.name}</p>
              <p className="text-sm text-muted-foreground">{staff.role}</p>
              <p className="text-xs text-muted-foreground">{staff.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-2 py-1 rounded-full text-xs ${
              staff.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
            }`}>
              {staff.status === 'active' ? 'Active' : 'On Leave'}
            </div>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      {performanceData.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{item.metric}</span>
            <span className="text-sm text-muted-foreground">{item.current} / {item.target}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                item.percentage >= 100 ? 'bg-success' : 
                item.percentage >= 80 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${Math.min(item.percentage, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={`font-medium ${
              item.percentage >= 100 ? 'text-success' : 
              item.percentage >= 80 ? 'text-warning' : 'text-error'
            }`}>
              {item.percentage.toFixed(1)}% of target
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-foreground">Branch Settings</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Auto-sync inventory</p>
              <p className="text-sm text-muted-foreground">Automatically sync inventory with main system</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Email notifications</p>
              <p className="text-sm text-muted-foreground">Send daily reports to branch manager</p>
            </div>
            <div className="w-12 h-6 bg-muted rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Patient data sharing</p>
              <p className="text-sm text-muted-foreground">Allow patient data access across branches</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <Button variant="destructive" iconName="Trash2">
          Deactivate Branch
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'staff': return renderStaff();
      case 'performance': return renderPerformance();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4">
      <div className="bg-popover rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-popover-foreground">{branch.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{branch.address}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BranchDetailsModal;