import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PatientSearchFilters = ({ onSearch, onFilter, filters, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const visitFrequencyOptions = [
    { value: 'all', label: 'All Frequencies' },
    { value: 'regular', label: 'Regular (3+ visits/year)' },
    { value: 'occasional', label: 'Occasional (1-2 visits/year)' },
    { value: 'new', label: 'New Patient' },
    { value: 'returning', label: 'Returning Patient' }
  ];

  const prescriptionTypeOptions = [
    { value: 'all', label: 'All Prescriptions' },
    { value: 'glasses', label: 'Glasses' },
    { value: 'contacts', label: 'Contact Lenses' },
    { value: 'both', label: 'Glasses & Contacts' },
    { value: 'none', label: 'No Prescription' }
  ];

  const insuranceOptions = [
    { value: 'all', label: 'All Insurance' },
    { value: 'insured', label: 'Has Insurance' },
    { value: 'uninsured', label: 'No Insurance' },
    { value: 'pending', label: 'Insurance Pending' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    onFilter(filterType, value);
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setShowAdvancedFilters(false);
    onClearFilters();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search patients by name, phone, email, or ID..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Select
          options={statusOptions}
          value={filters.status || 'all'}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Status"
          className="min-w-32"
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Advanced Filters
        </Button>

        {(filters.status !== 'all' || filters.visitFrequency !== 'all' || 
          filters.prescriptionType !== 'all' || filters.insurance !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          <Select
            label="Visit Frequency"
            options={visitFrequencyOptions}
            value={filters.visitFrequency || 'all'}
            onChange={(value) => handleFilterChange('visitFrequency', value)}
          />

          <Select
            label="Prescription Type"
            options={prescriptionTypeOptions}
            value={filters.prescriptionType || 'all'}
            onChange={(value) => handleFilterChange('prescriptionType', value)}
          />

          <Select
            label="Insurance Status"
            options={insuranceOptions}
            value={filters.insurance || 'all'}
            onChange={(value) => handleFilterChange('insurance', value)}
          />
        </div>
      )}

      {/* Filter Summary */}
      {(filters.status !== 'all' || filters.visitFrequency !== 'all' || 
        filters.prescriptionType !== 'all' || filters.insurance !== 'all') && (
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 rounded-md p-2">
          <span>Active filters applied</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleClearAll}
            iconName="X"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientSearchFilters;