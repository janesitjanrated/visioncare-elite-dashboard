import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddLoanModal = ({ isOpen, onClose, onAddLoan }) => {
  const [formData, setFormData] = useState({
    lender: '',
    loanType: '',
    originalAmount: '',
    interestRate: '',
    term: '',
    startDate: '',
    monthlyPayment: '',
    collateral: '',
    purpose: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const loanTypes = [
    { value: 'Equipment Loan', label: 'Equipment Loan' },
    { value: 'Working Capital', label: 'Working Capital' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Line of Credit', label: 'Line of Credit' },
    { value: 'Term Loan', label: 'Term Loan' },
    { value: 'SBA Loan', label: 'SBA Loan' },
    { value: 'Bridge Loan', label: 'Bridge Loan' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lender.trim()) {
      newErrors.lender = 'Lender is required';
    }

    if (!formData.loanType) {
      newErrors.loanType = 'Loan type is required';
    }

    if (!formData.originalAmount || parseFloat(formData.originalAmount) <= 0) {
      newErrors.originalAmount = 'Valid original amount is required';
    }

    if (!formData.interestRate || parseFloat(formData.interestRate) <= 0) {
      newErrors.interestRate = 'Valid interest rate is required';
    }

    if (!formData.term || parseInt(formData.term) <= 0) {
      newErrors.term = 'Valid term is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.monthlyPayment || parseFloat(formData.monthlyPayment) <= 0) {
      newErrors.monthlyPayment = 'Valid monthly payment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newLoan = {
        ...formData,
        originalAmount: parseFloat(formData.originalAmount),
        remainingBalance: parseFloat(formData.originalAmount),
        interestRate: parseFloat(formData.interestRate),
        term: parseInt(formData.term),
        monthlyPayment: parseFloat(formData.monthlyPayment),
        status: 'current',
        nextPaymentDate: formData.startDate,
        payments: []
      };

      onAddLoan(newLoan);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      lender: '',
      loanType: '',
      originalAmount: '',
      interestRate: '',
      term: '',
      startDate: '',
      monthlyPayment: '',
      collateral: '',
      purpose: '',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Add New Loan</h2>
                <p className="text-sm text-muted-foreground">Enter loan details and terms</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Lender *
                </label>
                <Input
                  value={formData.lender}
                  onChange={(e) => handleInputChange('lender', e.target.value)}
                  placeholder="Enter lender name"
                  error={errors.lender}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Type *
                </label>
                <Select
                  options={loanTypes}
                  value={formData.loanType}
                  onChange={(e) => handleInputChange('loanType', e.target.value)}
                  error={errors.loanType}
                />
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Financial Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Original Amount *
                </label>
                <Input
                  type="number"
                  value={formData.originalAmount}
                  onChange={(e) => handleInputChange('originalAmount', e.target.value)}
                  placeholder="0.00"
                  error={errors.originalAmount}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interest Rate (%) *
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="0.0"
                  error={errors.interestRate}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Term (months) *
                </label>
                <Input
                  type="number"
                  value={formData.term}
                  onChange={(e) => handleInputChange('term', e.target.value)}
                  placeholder="12"
                  error={errors.term}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Monthly Payment *
                </label>
                <Input
                  type="number"
                  value={formData.monthlyPayment}
                  onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
                  placeholder="0.00"
                  error={errors.monthlyPayment}
                />
              </div>
            </div>
          </div>

          {/* Dates and Terms */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Dates and Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date *
                </label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  error={errors.startDate}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Collateral
                </label>
                <Input
                  value={formData.collateral}
                  onChange={(e) => handleInputChange('collateral', e.target.value)}
                  placeholder="e.g., Equipment, Property"
                />
              </div>
            </div>
          </div>

          {/* Purpose and Notes */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Purpose and Notes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Purpose
                </label>
                <Input
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  placeholder="e.g., Equipment Purchase, Working Capital"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes about the loan..."
                  className="w-full h-24 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} iconName="Save">
              Add Loan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLoanModal; 