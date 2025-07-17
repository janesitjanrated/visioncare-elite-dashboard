import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, loan, onPayment }) => {
  const [paymentData, setPaymentData] = useState({
    date: '',
    amount: '',
    paymentType: 'regular',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && loan) {
      // Set default payment date to today
      const today = new Date().toISOString().split('T')[0];
      setPaymentData({
        date: today,
        amount: loan.monthlyPayment.toString(),
        paymentType: 'regular',
        notes: ''
      });
    }
  }, [isOpen, loan]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculatePaymentBreakdown = () => {
    if (!paymentData.amount || !loan) return { principal: 0, interest: 0 };

    const paymentAmount = parseFloat(paymentData.amount);
    const remainingBalance = loan.remainingBalance;
    const monthlyInterestRate = loan.interestRate / 100 / 12;
    
    // Calculate interest for the current month
    const interest = remainingBalance * monthlyInterestRate;
    const principal = Math.min(paymentAmount - interest, remainingBalance);
    
    return {
      principal: Math.max(0, principal),
      interest: Math.min(interest, paymentAmount)
    };
  };

  const calculateNextPaymentDate = () => {
    if (!paymentData.date) return '';
    
    const paymentDate = new Date(paymentData.date);
    const nextMonth = new Date(paymentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    return nextMonth.toISOString().split('T')[0];
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.date) {
      newErrors.date = 'Payment date is required';
    }

    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      newErrors.amount = 'Valid payment amount is required';
    }

    if (parseFloat(paymentData.amount) > loan.remainingBalance + calculatePaymentBreakdown().interest) {
      newErrors.amount = 'Payment amount cannot exceed remaining balance plus interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const breakdown = calculatePaymentBreakdown();
      const nextPaymentDate = calculateNextPaymentDate();
      
      const paymentInfo = {
        date: paymentData.date,
        amount: parseFloat(paymentData.amount),
        principal: breakdown.principal,
        interest: breakdown.interest,
        paymentType: paymentData.paymentType,
        notes: paymentData.notes,
        nextPaymentDate: nextPaymentDate
      };

      onPayment(paymentInfo);
      handleClose();
    }
  };

  const handleClose = () => {
    setPaymentData({
      date: '',
      amount: '',
      paymentType: 'regular',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !loan) return null;

  const breakdown = calculatePaymentBreakdown();
  const nextPaymentDate = calculateNextPaymentDate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Record Payment</h2>
                <p className="text-sm text-muted-foreground">{loan.loanNumber} - {loan.lender}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Loan Summary */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Remaining Balance</p>
                <p className="font-medium text-foreground">{formatCurrency(loan.remainingBalance)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Monthly Payment</p>
                <p className="font-medium text-foreground">{formatCurrency(loan.monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Interest Rate</p>
                <p className="font-medium text-foreground">{loan.interestRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Next Due Date</p>
                <p className="font-medium text-foreground">{loan.nextPaymentDate}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Payment Date *
                </label>
                <Input
                  type="date"
                  value={paymentData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  error={errors.date}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Payment Amount *
                </label>
                <Input
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0.00"
                  error={errors.amount}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Type
              </label>
              <select
                value={paymentData.paymentType}
                onChange={(e) => handleInputChange('paymentType', e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="regular">Regular Payment</option>
                <option value="extra">Extra Payment</option>
                <option value="partial">Partial Payment</option>
                <option value="late">Late Payment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes
              </label>
              <textarea
                value={paymentData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Optional notes about this payment..."
                className="w-full h-20 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            {/* Payment Breakdown */}
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Payment Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Payment</p>
                  <p className="font-medium text-foreground">{formatCurrency(parseFloat(paymentData.amount) || 0)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Principal</p>
                  <p className="font-medium text-success">{formatCurrency(breakdown.principal)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Interest</p>
                  <p className="font-medium text-warning">{formatCurrency(breakdown.interest)}</p>
                </div>
              </div>
              
              {nextPaymentDate && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Next payment date will be updated to: <span className="font-medium text-foreground">{nextPaymentDate}</span>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} iconName="Save">
              Record Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 