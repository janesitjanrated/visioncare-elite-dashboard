import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoansTable = ({ loans, onViewLoan, onMakePayment, sortBy, sortOrder, onSort }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      current: { color: 'bg-success/10 text-success', label: 'Current' },
      overdue: { color: 'bg-error/10 text-error', label: 'Overdue' },
      paid: { color: 'bg-primary/10 text-primary', label: 'Paid Off' },
      default: { color: 'bg-warning/10 text-warning', label: 'Default' }
    };
    
    const config = statusConfig[status] || statusConfig.current;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortOrder === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const handleSort = (field) => {
    onSort(field);
  };

  if (loans.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Loans Found</h3>
        <p className="text-muted-foreground mb-4">
          No loans match your current filters. Try adjusting your search criteria.
        </p>
        <Button variant="outline" iconName="Plus">
          Add New Loan
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('loanNumber')}
                >
                  <span>Loan Number</span>
                  {getSortIcon('loanNumber')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('lender')}
                >
                  <span>Lender</span>
                  {getSortIcon('lender')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-foreground">Loan Type</span>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('remainingBalance')}
                >
                  <span>Remaining Balance</span>
                  {getSortIcon('remainingBalance')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('interestRate')}
                >
                  <span>Interest Rate</span>
                  {getSortIcon('interestRate')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('nextPayment')}
                >
                  <span>Next Payment</span>
                  {getSortIcon('nextPayment')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{loan.loanNumber}</p>
                    <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{loan.lender}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{loan.loanType}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{formatCurrency(loan.remainingBalance)}</p>
                    <p className="text-sm text-muted-foreground">
                      of {formatCurrency(loan.originalAmount)}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{loan.interestRate}%</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{formatDate(loan.nextPaymentDate)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(loan.monthlyPayment)}/month
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(loan.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewLoan(loan)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMakePayment(loan)}
                      iconName="CreditCard"
                    >
                      Payment
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {loans.length} loan{loans.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Printer">
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansTable; 