import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PatientSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mockPatients = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      lastVisit: "2025-01-08",
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@email.com",
      lastVisit: "2025-01-05",
      status: "active"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@email.com",
      lastVisit: "2024-12-28",
      status: "active"
    },
    {
      id: 4,
      name: "David Thompson",
      phone: "+1 (555) 456-7890",
      email: "david.thompson@email.com",
      lastVisit: "2024-12-15",
      status: "inactive"
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.length > 0) {
      setTimeout(() => {
        const filtered = mockPatients.filter(patient =>
          patient.name.toLowerCase().includes(query.toLowerCase()) ||
          patient.phone.includes(query) ||
          patient.email.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setShowResults(true);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  };

  const handlePatientSelect = (patient) => {
    console.log('Selected patient:', patient);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleAddNewPatient = () => {
    console.log('Adding new patient');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 ิ">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Patient Search</h3>
          <p className="text-sm text-muted-foreground">Find patient records quickly</p>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-dropdown max-h-64 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-hover text-left"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
                      <p className="text-xs text-muted-foreground">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' ?'bg-green-100 text-green-800' :'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center">
                <Icon name="UserX" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-3">No patients found</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Plus" 
                  onClick={handleAddNewPatient}
                >
                  Add New Patient
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Quick Actions</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Plus">
              New Patient
            </Button>
            <Button variant="outline" size="sm" iconName="Users">
              All Patients
            </Button>
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {showResults && (
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default PatientSearchBar;