import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoanDetailsModal = ({ isOpen, onClose, loan, onMakePayment }) => {
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
      month: 'long',
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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const calculateProgress = () => {
    const paid = loan.originalAmount - loan.remainingBalance;
    return (paid / loan.originalAmount * 100).toFixed(1);
  };

  const getDaysUntilNextPayment = () => {
    const today = new Date();
    const nextPayment = new Date(loan.nextPaymentDate);
    const diffTime = nextPayment - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!isOpen || !loan) return null;

  const daysUntilPayment = getDaysUntilNextPayment();
  const progress = calculateProgress();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{loan.loanNumber}</h2>
                <p className="text-sm text-muted-foreground">{loan.lender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(loan.status)}
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Loan Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Loan Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Type</p>
                    <p className="font-medium text-foreground">{loan.loanType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purpose</p>
                    <p className="font-medium text-foreground">{loan.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Collateral</p>
                    <p className="font-medium text-foreground">{loan.collateral}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{formatDate(loan.startDate)}</p>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original Amount:</span>
                      <span className="font-medium">{formatCurrency(loan.originalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Balance:</span>
                      <span className="font-medium text-error">{formatCurrency(loan.remainingBalance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Paid:</span>
                      <span className="font-medium text-success">{formatCurrency(loan.originalAmount - loan.remainingBalance)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate:</span>
                      <span className="font-medium">{loan.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Payment:</span>
                      <span className="font-medium">{formatCurrency(loan.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term:</span>
                      <span className="font-medium">{loan.term} months</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Payment Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Next Payment */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Next Payment</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {formatCurrency(loan.monthlyPayment)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Due {formatDate(loan.nextPaymentDate)}
                  </p>
                  <div className={`text-sm font-medium ${
                    daysUntilPayment <= 7 ? 'text-error' : 
                    daysUntilPayment <= 14 ? 'text-warning' : 'text-success'
                  }`}>
                    {daysUntilPayment > 0 ? `${daysUntilPayment} days remaining` : 
                     daysUntilPayment === 0 ? 'Due today' : 
                     `${Math.abs(daysUntilPayment)} days overdue`}
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    onClick={() => onMakePayment(loan)} 
                    className="w-full"
                    iconName="CreditCard"
                  >
                    Make Payment
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" iconName="Download">
                    Download Statement
                  </Button>
                  <Button variant="outline" className="w-full" iconName="Mail">
                    Contact Lender
                  </Button>
                  <Button variant="outline" className="w-full" iconName="Edit">
                    Edit Loan Details
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment History</h3>
            {loan.payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Principal</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Interest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loan.payments.map((payment, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{formatDate(payment.date)}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(payment.principal)}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(payment.interest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No payments recorded yet</p>
              </div>
            )}
          </div>

          {/* Notes */}
          {loan.notes && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Notes</h3>
              <p className="text-sm text-foreground">{loan.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onMakePayment(loan)} iconName="CreditCard">
              Make Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal; 