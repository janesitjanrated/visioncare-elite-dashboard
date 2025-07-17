import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PatientListCard from './PatientListCard';

const PatientList = ({ patients, selectedPatient, onSelectPatient, searchTerm, filters }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          patient.name.toLowerCase().includes(searchLower) ||
          patient.phone.includes(searchTerm) ||
          patient.email.toLowerCase().includes(searchLower) ||
          patient.patientId.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'all') {
        if (patient.status !== filters.status) return false;
      }

      // Visit frequency filter
      if (filters.visitFrequency && filters.visitFrequency !== 'all') {
        if (patient.visitFrequency !== filters.visitFrequency) return false;
      }

      // Prescription type filter
      if (filters.prescriptionType && filters.prescriptionType !== 'all') {
        if (patient.prescriptionType !== filters.prescriptionType) return false;
      }

      // Insurance filter
      if (filters.insurance && filters.insurance !== 'all') {
        const hasInsurance = patient.hasInsurance;
        if (filters.insurance === 'insured' && !hasInsurance) return false;
        if (filters.insurance === 'uninsured' && hasInsurance) return false;
        if (filters.insurance === 'pending' && patient.insuranceStatus !== 'pending') return false;
      }

      return true;
    });

    // Sort patients
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'lastVisit':
          aValue = new Date(a.lastVisit);
          bValue = new Date(b.lastVisit);
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'patientId':
          aValue = a.patientId;
          bValue = b.patientId;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [patients, searchTerm, filters, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">
            Patients ({filteredAndSortedPatients.length})
          </h2>
          <Button variant="default" size="sm" iconName="Plus">
            Add Patient
          </Button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Sort by:</span>
          <button
            onClick={() => handleSort('name')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              sortBy === 'name' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            <span>Name</span>
            <Icon name={getSortIcon('name')} size={12} />
          </button>
          <button
            onClick={() => handleSort('lastVisit')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              sortBy === 'lastVisit' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            <span>Last Visit</span>
            <Icon name={getSortIcon('lastVisit')} size={12} />
          </button>
          <button
            onClick={() => handleSort('status')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              sortBy === 'status' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            <span>Status</span>
            <Icon name={getSortIcon('status')} size={12} />
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredAndSortedPatients.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Patients Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || Object.values(filters).some(f => f !== 'all') 
                ? 'Try adjusting your search or filters' :'Add your first patient to get started'
              }
            </p>
            <Button variant="default" iconName="Plus">
              Add Patient
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedPatients.map((patient) => (
              <PatientListCard
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onClick={onSelectPatient}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {filteredAndSortedPatients.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedPatients.length} patient{filteredAndSortedPatients.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Mail">
                Send Email
              </Button>
              <Button variant="outline" size="sm" iconName="Calendar">
                Bulk Schedule
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;