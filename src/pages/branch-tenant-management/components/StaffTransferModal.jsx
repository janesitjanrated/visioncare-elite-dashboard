import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StaffTransferModal = ({ isOpen, onClose, branches, selectedBranch }) => {
  const [transferData, setTransferData] = useState({
    staffMember: '',
    fromBranch: selectedBranch?.id || '',
    toBranch: '',
    transferDate: '',
    reason: '',
    notes: ''
  });

  const staffMembers = [
    { value: 'staff1', label: 'Dr. Sarah Johnson - Optometrist' },
    { value: 'staff2', label: 'Mike Chen - Sales Associate' },
    { value: 'staff3', label: 'Lisa Rodriguez - Administrative Assistant' },
    { value: 'staff4', label: 'David Kim - Technician' }
  ];

  const branchOptions = branches
    .filter(branch => branch.id !== transferData.fromBranch)
    .map(branch => ({
      value: branch.id,
      label: `${branch.name} - ${branch.address}`
    }));

  const reasonOptions = [
    { value: 'promotion', label: 'Promotion' },
    { value: 'coverage', label: 'Temporary Coverage' },
    { value: 'request', label: 'Employee Request' },
    { value: 'restructure', label: 'Organizational Restructure' },
    { value: 'training', label: 'Training Assignment' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Staff transfer data:', transferData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setTransferData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4">
      <div className="bg-popover rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-popover-foreground">Staff Transfer</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Transfer staff member between branches
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Staff Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Staff Member"
                options={staffMembers}
                value={transferData.staffMember}
                onChange={(value) => handleInputChange('staffMember', value)}
                placeholder="Select staff member"
                required
              />
              
              <Input
                label="Transfer Date"
                type="date"
                value={transferData.transferDate}
                onChange={(e) => handleInputChange('transferDate', e.target.value)}
                required
              />
            </div>

            {/* Branch Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-popover-foreground mb-2">
                  From Branch
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    {selectedBranch?.name || 'Select source branch'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedBranch?.address}
                  </p>
                </div>
              </div>
              
              <Select
                label="To Branch"
                options={branchOptions}
                value={transferData.toBranch}
                onChange={(value) => handleInputChange('toBranch', value)}
                placeholder="Select destination branch"
                required
              />
            </div>

            {/* Transfer Details */}
            <Select
              label="Transfer Reason"
              options={reasonOptions}
              value={transferData.reason}
              onChange={(value) => handleInputChange('reason', value)}
              placeholder="Select reason for transfer"
              required
            />

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-popover-foreground mb-2">
                Additional Notes
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Add any additional notes about the transfer..."
                value={transferData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>

            {/* Transfer Impact */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-2 text-warning" />
                Transfer Impact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Source Branch Impact:</p>
                  <ul className="mt-1 space-y-1 text-foreground">
                    <li>• Staff count will decrease by 1</li>
                    <li>• May require temporary coverage</li>
                    <li>• Patient assignments need review</li>
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground">Destination Branch Impact:</p>
                  <ul className="mt-1 space-y-1 text-foreground">
                    <li>• Staff count will increase by 1</li>
                    <li>• Additional capacity for patients</li>
                    <li>• Onboarding process required</li>
                  </ul>
                </div>
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
              iconName="ArrowRight"
              onClick={handleSubmit}
            >
              Process Transfer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffTransferModal;