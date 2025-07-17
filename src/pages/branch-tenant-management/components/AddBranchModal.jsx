import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AddBranchModal = ({ isOpen, onClose, onAddBranch }) => {
  const [branchData, setBranchData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    managerName: '',
    managerEmail: '',
    operatingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '12:00', close: '17:00', closed: true }
    },
    services: [],
    subscriptionTier: 'basic'
  });

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' }
  ];

  const subscriptionOptions = [
    { value: 'basic', label: 'Basic Plan - $99/month' },
    { value: 'professional', label: 'Professional Plan - $199/month' },
    { value: 'enterprise', label: 'Enterprise Plan - $399/month' }
  ];

  const serviceOptions = [
    'Eye Examinations',
    'Contact Lens Fitting',
    'Prescription Glasses',
    'Sunglasses',
    'Frame Repairs',
    'Insurance Processing',
    'Pediatric Eye Care',
    'Low Vision Services'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBranch = {
      id: `branch_${Date.now()}`,
      ...branchData,
      status: 'active',
      dailyRevenue: 0,
      patientCount: 0,
      staffCount: 1,
      inventoryItems: 0,
      performance: 0,
      createdAt: new Date().toISOString()
    };
    onAddBranch(newBranch);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setBranchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setBranchData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setBranchData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4">
      <div className="bg-popover rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-popover-foreground">Add New Branch</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create a new branch location for your clinic network
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-popover-foreground mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Branch Name"
                  type="text"
                  placeholder="Downtown Vision Center"
                  value={branchData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={branchData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="downtown@clinicvision.com"
                  value={branchData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                
                <Select
                  label="Subscription Tier"
                  options={subscriptionOptions}
                  value={branchData.subscriptionTier}
                  onChange={(value) => handleInputChange('subscriptionTier', value)}
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium text-popover-foreground mb-4">Address Information</h3>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  type="text"
                  placeholder="123 Main Street, Suite 100"
                  value={branchData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text"
                    placeholder="New York"
                    value={branchData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                  
                  <Select
                    label="State"
                    options={stateOptions}
                    value={branchData.state}
                    onChange={(value) => handleInputChange('state', value)}
                    placeholder="Select state"
                    required
                  />
                  
                  <Input
                    label="ZIP Code"
                    type="text"
                    placeholder="10001"
                    value={branchData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Manager Information */}
            <div>
              <h3 className="text-lg font-medium text-popover-foreground mb-4">Branch Manager</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Manager Name"
                  type="text"
                  placeholder="Dr. Sarah Johnson"
                  value={branchData.managerName}
                  onChange={(e) => handleInputChange('managerName', e.target.value)}
                  required
                />
                
                <Input
                  label="Manager Email"
                  type="email"
                  placeholder="sarah.johnson@clinicvision.com"
                  value={branchData.managerEmail}
                  onChange={(e) => handleInputChange('managerEmail', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Services Offered */}
            <div>
              <h3 className="text-lg font-medium text-popover-foreground mb-4">Services Offered</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {serviceOptions.map((service) => (
                  <Checkbox
                    key={service}
                    label={service}
                    checked={branchData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-lg font-medium text-popover-foreground mb-4">Operating Hours</h3>
              <div className="space-y-3">
                {Object.entries(branchData.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-20">
                      <span className="text-sm font-medium text-foreground capitalize">{day}</span>
                    </div>
                    
                    <Checkbox
                      label="Closed"
                      checked={hours.closed}
                      onChange={(e) => handleHoursChange(day, 'closed', e.target.checked)}
                    />
                    
                    {!hours.closed && (
                      <>
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                          className="w-32"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              onClick={handleSubmit}
            >
              Create Branch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBranchModal;