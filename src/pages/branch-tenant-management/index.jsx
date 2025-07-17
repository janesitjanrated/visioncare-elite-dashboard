import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';

import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import BranchCard from './components/BranchCard';
import BranchMap from './components/BranchMap';
import BranchMetrics from './components/BranchMetrics';
import StaffTransferModal from './components/StaffTransferModal';
import AddBranchModal from './components/AddBranchModal';
import BranchDetailsModal from './components/BranchDetailsModal';

const BranchTenantManagement = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('performance');
  const [showStaffTransferModal, setShowStaffTransferModal] = useState(false);
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [showBranchDetailsModal, setShowBranchDetailsModal] = useState(false);
  const [selectedBranchForDetails, setSelectedBranchForDetails] = useState(null);

  // Mock user data
  const user = {
    id: 'user_001',
    name: 'Dr. Michael Thompson',
    email: 'michael.thompson@clinicvision.com',
    role: 'owner',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  // Mock branches data
  const [branches, setBranches] = useState([
    {
      id: 'branch_001',
      name: 'Downtown Vision Center',
      address: '123 Main Street, New York, NY 10001',
      status: 'active',
      dailyRevenue: 12500,
      patientCount: 45,
      staffCount: 8,
      inventoryItems: 1250,
      performance: 92,
      operatingHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 'branch_002',
      name: 'Uptown Eye Care',
      address: '456 Broadway Avenue, New York, NY 10025',
      status: 'active',
      dailyRevenue: 8750,
      patientCount: 32,
      staffCount: 6,
      inventoryItems: 890,
      performance: 78,
      operatingHours: 'Mon-Fri: 8AM-7PM, Sat: 9AM-5PM',
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
      id: 'branch_003',
      name: 'Brooklyn Vision Hub',
      address: '789 Atlantic Avenue, Brooklyn, NY 11217',
      status: 'active',
      dailyRevenue: 15200,
      patientCount: 58,
      staffCount: 12,
      inventoryItems: 1680,
      performance: 95,
      operatingHours: 'Mon-Sat: 9AM-8PM, Sun: 12PM-6PM',
      coordinates: { lat: 40.6892, lng: -73.9442 }
    },
    {
      id: 'branch_004',
      name: 'Queens Family Optical',
      address: '321 Northern Boulevard, Queens, NY 11354',
      status: 'maintenance',
      dailyRevenue: 5400,
      patientCount: 18,
      staffCount: 4,
      inventoryItems: 520,
      performance: 45,
      operatingHours: 'Mon-Fri: 10AM-6PM (Limited Service)',
      coordinates: { lat: 40.7589, lng: -73.8370 }
    },
    {
      id: 'branch_005',
      name: 'Staten Island Eye Clinic',
      address: '654 Victory Boulevard, Staten Island, NY 10301',
      status: 'active',
      dailyRevenue: 9800,
      patientCount: 38,
      staffCount: 7,
      inventoryItems: 1120,
      performance: 85,
      operatingHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-3PM',
      coordinates: { lat: 40.6501, lng: -74.1142 }
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Branches' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const sortOptions = [
    { value: 'performance', label: 'Performance' },
    { value: 'revenue', label: 'Daily Revenue' },
    { value: 'patients', label: 'Patient Count' },
    { value: 'name', label: 'Branch Name' }
  ];

  // Filter and sort branches
  const filteredAndSortedBranches = branches
    .filter(branch => filterStatus === 'all' || branch.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'performance':
          return b.performance - a.performance;
        case 'revenue':
          return b.dailyRevenue - a.dailyRevenue;
        case 'patients':
          return b.patientCount - a.patientCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const handleEditBranch = (branch) => {
    console.log('Edit branch:', branch);
    // Implementation for editing branch
  };

  const handleViewDetails = (branch) => {
    setSelectedBranchForDetails(branch);
    setShowBranchDetailsModal(true);
  };

  const handleTransferStaff = (branch) => {
    setSelectedBranch(branch);
    setShowStaffTransferModal(true);
  };

  const handleAddBranch = (newBranch) => {
    setBranches(prev => [...prev, newBranch]);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  // Set initial selected branch
  useEffect(() => {
    if (branches.length > 0 && !selectedBranch) {
      setSelectedBranch(branches[0]);
    }
  }, [branches, selectedBranch]);

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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Branch & Tenant Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your clinic network across multiple locations
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                size="sm"
              >
                Export Report
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={() => setShowAddBranchModal(true)}
              >
                Add Branch
              </Button>
            </div>
          </div>

          {/* Branch Metrics */}
          <BranchMetrics branches={branches} />

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-card border border-border rounded-lg p-4 bg-emerald-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  iconName="Grid3X3"
                  onClick={() => setViewMode('grid')}
                />
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  iconName="Map"
                  onClick={() => setViewMode('map')}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                {filteredAndSortedBranches.length} of {branches.length} branches
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder="Filter by status"
                className="w-40"
              />
              
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Sort by"
                className="w-40"
              />
            </div>
          </div>

          {/* Content Area */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedBranches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  onEdit={handleEditBranch}
                  onViewDetails={handleViewDetails}
                  onTransferStaff={handleTransferStaff}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Map */}
              <div className="xl:col-span-2">
                <BranchMap
                  branches={filteredAndSortedBranches}
                  selectedBranch={selectedBranch}
                  onBranchSelect={handleBranchSelect}
                />
              </div>
              
              {/* Branch List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Branch List</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAndSortedBranches.map((branch) => (
                    <div
                      key={branch.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedBranch?.id === branch.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleBranchSelect(branch)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{branch.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${
                          branch.status === 'active' ? 'bg-success' :
                          branch.status === 'maintenance' ? 'bg-warning' : 'bg-error'
                        }`} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{branch.address}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Performance:</span>
                        <span className={`font-medium ${
                          branch.performance >= 80 ? 'text-success' :
                          branch.performance >= 60 ? 'text-warning' : 'text-error'
                        }`}>
                          {branch.performance}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="UserPlus"
                className="h-20 flex-col space-y-2"
                onClick={() => setShowStaffTransferModal(true)}
              >
                <span>Staff Transfer</span>
                <span className="text-xs text-muted-foreground">Move staff between branches</span>
              </Button>
              
              <Button
                variant="outline"
                iconName="BarChart3"
                className="h-20 flex-col space-y-2"
              >
                <span>Performance Report</span>
                <span className="text-xs text-muted-foreground">Generate branch analytics</span>
              </Button>
              
              <Button
                variant="outline"
                iconName="Settings"
                className="h-20 flex-col space-y-2"
              >
                <span>Global Settings</span>
                <span className="text-xs text-muted-foreground">Configure network policies</span>
              </Button>
              
              <Button
                variant="outline"
                iconName="Sync"
                className="h-20 flex-col space-y-2"
              >
                <span>Sync Data</span>
                <span className="text-xs text-muted-foreground">Synchronize all branches</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <StaffTransferModal
        isOpen={showStaffTransferModal}
        onClose={() => setShowStaffTransferModal(false)}
        branches={branches}
        selectedBranch={selectedBranch}
      />

      <AddBranchModal
        isOpen={showAddBranchModal}
        onClose={() => setShowAddBranchModal(false)}
        onAddBranch={handleAddBranch}
      />

      <BranchDetailsModal
        isOpen={showBranchDetailsModal}
        onClose={() => setShowBranchDetailsModal(false)}
        branch={selectedBranchForDetails}
      />
    </div>
  );
};

export default BranchTenantManagement;