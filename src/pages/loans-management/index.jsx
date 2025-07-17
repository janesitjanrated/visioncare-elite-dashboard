import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import LoansTable from './components/LoansTable';
import LoanStats from './components/LoanStats';
import AddLoanModal from './components/AddLoanModal';
import LoanDetailsModal from './components/LoanDetailsModal';
import PaymentModal from './components/PaymentModal';

const LoansManagement = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [lenderFilter, setLenderFilter] = useState('all');
  const [showAddLoanModal, setShowAddLoanModal] = useState(false);
  const [showLoanDetailsModal, setShowLoanDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [sortBy, setSortBy] = useState('nextPayment');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock user data
  const user = {
    id: 1,
    name: "Dr. Michael Rodriguez",
    email: "michael.rodriguez@clinicvision.com",
    role: "owner",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
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

  // Mock loans data
  const mockLoans = [
    {
      id: 1,
      loanNumber: 'LN-2024-001',
      lender: 'First National Bank',
      loanType: 'Equipment Loan',
      originalAmount: 150000,
      remainingBalance: 120000,
      interestRate: 4.5,
      term: 60,
      startDate: '2024-01-15',
      nextPaymentDate: '2025-08-15',
      monthlyPayment: 2800,
      status: 'current',
      collateral: 'Optical Equipment',
      purpose: 'Equipment Purchase',
      notes: 'Primary equipment financing for new branch',
      payments: [
        { date: '2024-02-15', amount: 2800, principal: 2200, interest: 600 },
        { date: '2024-03-15', amount: 2800, principal: 2220, interest: 580 },
        { date: '2024-04-15', amount: 2800, principal: 2240, interest: 560 }
      ]
    },
    {
      id: 2,
      loanNumber: 'LN-2024-002',
      lender: 'Equipment Finance Co.',
      loanType: 'Working Capital',
      originalAmount: 75000,
      remainingBalance: 45000,
      interestRate: 6.2,
      term: 36,
      startDate: '2024-03-01',
      nextPaymentDate: '2025-08-01',
      monthlyPayment: 2300,
      status: 'current',
      collateral: 'Accounts Receivable',
      purpose: 'Working Capital',
      notes: 'Short-term working capital for expansion',
      payments: [
        { date: '2024-04-01', amount: 2300, principal: 1800, interest: 500 },
        { date: '2024-05-01', amount: 2300, principal: 1820, interest: 480 },
        { date: '2024-06-01', amount: 2300, principal: 1840, interest: 460 }
      ]
    },
    {
      id: 3,
      loanNumber: 'LN-2023-003',
      lender: 'Small Business Bank',
      loanType: 'Real Estate',
      originalAmount: 500000,
      remainingBalance: 480000,
      interestRate: 3.8,
      term: 240,
      startDate: '2023-06-01',
      nextPaymentDate: '2025-07-01',
      monthlyPayment: 3200,
      status: 'current',
      collateral: 'Commercial Property',
      purpose: 'Property Purchase',
      notes: 'Main clinic building mortgage',
      payments: [
        { date: '2023-07-01', amount: 3200, principal: 1800, interest: 1400 },
        { date: '2023-08-01', amount: 3200, principal: 1820, interest: 1380 },
        { date: '2023-09-01', amount: 3200, principal: 1840, interest: 1360 }
      ]
    },
    {
      id: 4,
      loanNumber: 'LN-2024-004',
      lender: 'Credit Union',
      loanType: 'Line of Credit',
      originalAmount: 100000,
      remainingBalance: 25000,
      interestRate: 5.5,
      term: 12,
      startDate: '2024-05-01',
      nextPaymentDate: '2025-08-10',
      monthlyPayment: 8500,
      status: 'current',
      collateral: 'Business Assets',
      purpose: 'Inventory Purchase',
      notes: 'Revolving line for inventory management',
      payments: [
        { date: '2024-06-01', amount: 8500, principal: 8000, interest: 500 },
        { date: '2024-07-01', amount: 8500, principal: 8050, interest: 450 }
      ]
    }
  ];

  useEffect(() => {
    setLoans(mockLoans);
    setFilteredLoans(mockLoans);
    if (branches.length > 0) {
      setSelectedBranch(branches[0]);
    }
  }, []);

  useEffect(() => {
    filterLoans();
  }, [loans, searchTerm, statusFilter, lenderFilter, sortBy, sortOrder]);

  const filterLoans = () => {
    let filtered = [...loans];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(loan =>
        loan.loanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.lender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.loanType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(loan => loan.status === statusFilter);
    }

    // Lender filter
    if (lenderFilter !== 'all') {
      filtered = filtered.filter(loan => loan.lender === lenderFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'nextPayment':
          aValue = new Date(a.nextPaymentDate);
          bValue = new Date(b.nextPaymentDate);
          break;
        case 'remainingBalance':
          aValue = a.remainingBalance;
          bValue = b.remainingBalance;
          break;
        case 'interestRate':
          aValue = a.interestRate;
          bValue = b.interestRate;
          break;
        case 'lender':
          aValue = a.lender;
          bValue = b.lender;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLoans(filtered);
  };

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  const handleLenderFilter = (value) => {
    setLenderFilter(value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAddLoan = (newLoan) => {
    const loan = {
      ...newLoan,
      id: Date.now(),
      loanNumber: `LN-${new Date().getFullYear()}-${String(loans.length + 1).padStart(3, '0')}`,
      payments: []
    };
    setLoans([...loans, loan]);
    setShowAddLoanModal(false);
  };

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setShowLoanDetailsModal(true);
  };

  const handleMakePayment = (loan) => {
    setSelectedLoan(loan);
    setShowPaymentModal(true);
  };

  const handlePayment = (paymentData) => {
    const updatedLoans = loans.map(loan => {
      if (loan.id === selectedLoan.id) {
        const newPayment = {
          date: paymentData.date,
          amount: paymentData.amount,
          principal: paymentData.principal,
          interest: paymentData.interest
        };
        
        const newRemainingBalance = loan.remainingBalance - paymentData.principal;
        
        return {
          ...loan,
          remainingBalance: newRemainingBalance,
          payments: [...loan.payments, newPayment],
          nextPaymentDate: paymentData.nextPaymentDate
        };
      }
      return loan;
    });
    
    setLoans(updatedLoans);
    setShowPaymentModal(false);
    setSelectedLoan(null);
  };

  const getUniqueLenders = () => {
    const lenders = [...new Set(loans.map(loan => loan.lender))];
    return lenders.map(lender => ({ value: lender, label: lender }));
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'current', label: 'Current' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'paid', label: 'Paid Off' },
    { value: 'default', label: 'Default' }
  ];

  const sortOptions = [
    { value: 'nextPayment', label: 'Next Payment' },
    { value: 'remainingBalance', label: 'Remaining Balance' },
    { value: 'interestRate', label: 'Interest Rate' },
    { value: 'lender', label: 'Lender' }
  ];

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Loans Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage all business loans, track payments, and monitor debt obligations
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => setShowAddLoanModal(true)} iconName="Plus">
                Add New Loan
              </Button>
            </div>
          </div>

          {/* Loan Statistics */}
          <LoanStats loans={loans} />

          {/* Filters and Search */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search Loans
                </label>
                <Input
                  placeholder="Search by loan number, lender..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Lender
                </label>
                <Select
                  options={[{ value: 'all', label: 'All Lenders' }, ...getUniqueLenders()]}
                  value={lenderFilter}
                  onChange={(e) => handleLenderFilter(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sort By
                </label>
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Loans Table */}
          <LoansTable
            loans={filteredLoans}
            onViewLoan={handleViewLoan}
            onMakePayment={handleMakePayment}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </div>
      </main>

      {/* Modals */}
      {showAddLoanModal && (
        <AddLoanModal
          isOpen={showAddLoanModal}
          onClose={() => setShowAddLoanModal(false)}
          onAddLoan={handleAddLoan}
        />
      )}

      {showLoanDetailsModal && selectedLoan && (
        <LoanDetailsModal
          isOpen={showLoanDetailsModal}
          onClose={() => setShowLoanDetailsModal(false)}
          loan={selectedLoan}
          onMakePayment={handleMakePayment}
        />
      )}

      {showPaymentModal && selectedLoan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          loan={selectedLoan}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
};

export default LoansManagement; 