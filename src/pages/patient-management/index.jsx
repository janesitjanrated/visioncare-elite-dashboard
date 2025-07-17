import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import PatientSearchFilters from './components/PatientSearchFilters';
import PatientList from './components/PatientList';
import PatientDetailPanel from './components/PatientDetailPanel';
import { useAuth } from '../../contexts/AuthContext';

const PatientManagement = () => {
  const { user: authUser, userProfile } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    visitFrequency: 'all',
    prescriptionType: 'all',
    insurance: 'all'
  });

  // Use authenticated user data
  const user = authUser ? {
    id: authUser.id,
    name: authUser.name || userProfile?.name || "User",
    email: authUser.email,
    role: authUser.role || "staff",
    avatar: userProfile?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  } : {
    id: 1,
    name: "Demo User",
    email: "demo@clinicvision.com",
    role: "staff",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
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
    }
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  // Mock patients data
  const mockPatients = [
    {
      id: 1,
      patientId: "PT001",
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john.smith@email.com",
      address: "123 Oak Street, Springfield, IL 62701",
      dateOfBirth: "1985-03-15",
      gender: "male",
      status: "active",
      lastVisit: "2024-07-10",
      hasInsurance: true,
      hasPendingAppointment: false,
      prescriptionDue: false,
      visitFrequency: "regular",
      prescriptionType: "glasses",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      insurance: {
        provider: "Blue Cross Blue Shield",
        policyNumber: "BC123456789",
        groupNumber: "GRP001",
        verified: true
      },
      prescriptions: [
        {
          date: "2024-07-10",
          type: "Distance Glasses",
          rightEye: { sphere: "-2.25", cylinder: "-0.50", axis: "180" },
          leftEye: { sphere: "-2.00", cylinder: "-0.75", axis: "175" },
          notes: "Patient reports improved clarity with new prescription"
        },
        {
          date: "2023-07-15",
          type: "Reading Glasses",
          rightEye: { sphere: "+1.50", cylinder: "0.00", axis: "0" },
          leftEye: { sphere: "+1.75", cylinder: "0.00", axis: "0" },
          notes: "First reading prescription"
        }
      ],
      appointments: [
        {
          date: "2024-07-10",
          time: "10:00 AM",
          type: "Annual Eye Exam",
          status: "completed",
          notes: "Routine checkup, prescription updated"
        },
        {
          date: "2024-08-15",
          time: "2:00 PM",
          type: "Follow-up",
          status: "scheduled",
          notes: "Check adaptation to new prescription"
        }
      ],
      financial: {
        totalPaid: 850.00,
        totalDue: 125.00,
        totalSpent: 975.00
      },
      transactions: [
        {
          date: "2024-07-10",
          description: "Eye Exam & Prescription",
          amount: 150.00,
          type: "charge",
          method: "insurance"
        },
        {
          date: "2024-07-10",
          description: "Insurance Payment",
          amount: 120.00,
          type: "payment",
          method: "insurance"
        }
      ]
    },
    {
      id: 2,
      patientId: "PT002",
      name: "Emily Davis",
      phone: "(555) 987-6543",
      email: "emily.davis@email.com",
      address: "456 Pine Avenue, Springfield, IL 62702",
      dateOfBirth: "1992-08-22",
      gender: "female",
      status: "pending",
      lastVisit: "2024-06-28",
      hasInsurance: false,
      hasPendingAppointment: true,
      prescriptionDue: true,
      visitFrequency: "occasional",
      prescriptionType: "contacts",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      insurance: null,
      prescriptions: [
        {
          date: "2024-06-28",
          type: "Contact Lenses",
          rightEye: { sphere: "-1.75", cylinder: "-0.25", axis: "90" },
          leftEye: { sphere: "-1.50", cylinder: "-0.50", axis: "85" },
          notes: "First contact lens fitting"
        }
      ],
      appointments: [
        {
          date: "2024-06-28",
          time: "3:30 PM",
          type: "Contact Lens Fitting",
          status: "completed",
          notes: "Initial fitting successful"
        },
        {
          date: "2024-07-20",
          time: "11:00 AM",
          type: "Contact Lens Follow-up",
          status: "scheduled",
          notes: "Check comfort and vision"
        }
      ],
      financial: {
        totalPaid: 200.00,
        totalDue: 75.00,
        totalSpent: 275.00
      },
      transactions: [
        {
          date: "2024-06-28",
          description: "Contact Lens Exam",
          amount: 100.00,
          type: "charge",
          method: "cash"
        },
        {
          date: "2024-06-28",
          description: "Contact Lenses (6 month supply)",
          amount: 175.00,
          type: "charge",
          method: "credit_card"
        }
      ]
    },
    {
      id: 3,
      patientId: "PT003",
      name: "Michael Rodriguez",
      phone: "(555) 456-7890",
      email: "michael.rodriguez@email.com",
      address: "789 Elm Drive, Springfield, IL 62703",
      dateOfBirth: "1978-12-05",
      gender: "male",
      status: "completed",
      lastVisit: "2024-05-15",
      hasInsurance: true,
      hasPendingAppointment: false,
      prescriptionDue: false,
      visitFrequency: "regular",
      prescriptionType: "both",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      insurance: {
        provider: "Aetna Vision",
        policyNumber: "AET987654321",
        groupNumber: "GRP002",
        verified: true
      },
      prescriptions: [
        {
          date: "2024-05-15",
          type: "Progressive Glasses",
          rightEye: { sphere: "-3.00", cylinder: "-1.00", axis: "15" },
          leftEye: { sphere: "-2.75", cylinder: "-0.75", axis: "165" },
          notes: "Progressive lenses for presbyopia"
        }
      ],
      appointments: [
        {
          date: "2024-05-15",
          time: "9:00 AM",
          type: "Comprehensive Eye Exam",
          status: "completed",
          notes: "Presbyopia detected, progressive lenses recommended"
        }
      ],
      financial: {
        totalPaid: 1200.00,
        totalDue: 0.00,
        totalSpent: 1200.00
      },
      transactions: [
        {
          date: "2024-05-15",
          description: "Comprehensive Eye Exam",
          amount: 200.00,
          type: "charge",
          method: "insurance"
        },
        {
          date: "2024-05-15",
          description: "Progressive Glasses",
          amount: 1000.00,
          type: "charge",
          method: "credit_card"
        }
      ]
    },
    {
      id: 4,
      patientId: "PT004",
      name: "Sarah Wilson",
      phone: "(555) 321-0987",
      email: "sarah.wilson@email.com",
      address: "321 Maple Street, Springfield, IL 62704",
      dateOfBirth: "1995-04-18",
      gender: "female",
      status: "active",
      lastVisit: "2024-07-08",
      hasInsurance: true,
      hasPendingAppointment: false,
      prescriptionDue: false,
      visitFrequency: "new",
      prescriptionType: "none",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      insurance: {
        provider: "VSP Vision Care",
        policyNumber: "VSP555666777",
        groupNumber: "GRP003",
        verified: false
      },
      prescriptions: [],
      appointments: [
        {
          date: "2024-07-08",
          time: "1:00 PM",
          type: "First Time Eye Exam",
          status: "completed",
          notes: "No prescription needed, excellent vision"
        }
      ],
      financial: {
        totalPaid: 75.00,
        totalDue: 0.00,
        totalSpent: 75.00
      },
      transactions: [
        {
          date: "2024-07-08",
          description: "Routine Eye Exam",
          amount: 75.00,
          type: "charge",
          method: "insurance"
        }
      ]
    },
    {
      id: 5,
      patientId: "PT005",
      name: "David Thompson",
      phone: "(555) 654-3210",
      email: "david.thompson@email.com",
      address: "654 Cedar Lane, Springfield, IL 62705",
      dateOfBirth: "1988-11-30",
      gender: "male",
      status: "inactive",
      lastVisit: "2023-12-20",
      hasInsurance: false,
      hasPendingAppointment: false,
      prescriptionDue: true,
      visitFrequency: "occasional",
      prescriptionType: "glasses",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      insurance: null,
      prescriptions: [
        {
          date: "2023-12-20",
          type: "Computer Glasses",
          rightEye: { sphere: "-0.75", cylinder: "0.00", axis: "0" },
          leftEye: { sphere: "-1.00", cylinder: "0.00", axis: "0" },
          notes: "Blue light filtering lenses for computer work"
        }
      ],
      appointments: [
        {
          date: "2023-12-20",
          time: "4:00 PM",
          type: "Computer Vision Exam",
          status: "completed",
          notes: "Digital eye strain symptoms"
        }
      ],
      financial: {
        totalPaid: 300.00,
        totalDue: 0.00,
        totalSpent: 300.00
      },
      transactions: [
        {
          date: "2023-12-20",
          description: "Computer Vision Exam",
          amount: 100.00,
          type: "charge",
          method: "cash"
        },
        {
          date: "2023-12-20",
          description: "Computer Glasses with Blue Light Filter",
          amount: 200.00,
          type: "charge",
          method: "debit_card"
        }
      ]
    }
  ];

  const [patients] = useState(mockPatients);

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      visitFrequency: 'all',
      prescriptionType: 'all',
      insurance: 'all'
    });
    setSearchTerm('');
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleUpdatePatient = (updatedPatient) => {
    // In a real app, this would update the patient in the database
    console.log('Updating patient:', updatedPatient);
    setSelectedPatient(updatedPatient);
  };

  const handleClosePatientDetail = () => {
    setSelectedPatient(null);
  };

  // Auto-select first patient on desktop
  useEffect(() => {
    if (patients.length > 0 && !selectedPatient && window.innerWidth >= 1024) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

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
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage patient records, appointments, and medical history
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <PatientSearchFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            filters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
            {/* Patient List */}
            <div className={`${selectedPatient ? 'hidden lg:block' : ''}`}>
              <PatientList
                patients={patients}
                selectedPatient={selectedPatient}
                onSelectPatient={handleSelectPatient}
                searchTerm={searchTerm}
                filters={filters}
              />
            </div>

            {/* Patient Detail Panel */}
            <div className={`${!selectedPatient ? 'hidden lg:block' : ''}`}>
              <PatientDetailPanel
                patient={selectedPatient}
                onUpdate={handleUpdatePatient}
                onClose={handleClosePatientDetail}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientManagement;