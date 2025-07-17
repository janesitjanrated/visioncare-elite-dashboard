import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateBalanceSheetModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    period: '',
    assets: {
      current: [
        { name: 'Cash and Cash Equivalents', amount: '' },
        { name: 'Accounts Receivable', amount: '' },
        { name: 'Inventory', amount: '' },
        { name: 'Prepaid Expenses', amount: '' },
        { name: 'Other Current Assets', amount: '' }
      ],
      nonCurrent: [
        { name: 'Property, Plant & Equipment', amount: '' },
        { name: 'Accumulated Depreciation', amount: '' },
        { name: 'Intangible Assets', amount: '' },
        { name: 'Long-term Investments', amount: '' },
        { name: 'Other Non-Current Assets', amount: '' }
      ]
    },
    liabilities: {
      current: [
        { name: 'Accounts Payable', amount: '' },
        { name: 'Accrued Expenses', amount: '' },
        { name: 'Short-term Loans', amount: '' },
        { name: 'Income Tax Payable', amount: '' },
        { name: 'Other Current Liabilities', amount: '' }
      ],
      nonCurrent: [
        { name: 'Long-term Loans', amount: '' },
        { name: 'Deferred Tax Liability', amount: '' },
        { name: 'Other Long-term Liabilities', amount: '' }
      ]
    },
    equity: [
      { name: 'Common Stock', amount: '' },
      { name: 'Retained Earnings', amount: '' },
      { name: 'Treasury Stock', amount: '' },
      { name: 'Other Comprehensive Income', amount: '' }
    ]
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('assets');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const calculateAssetsTotal = () => {
    const currentAssets = calculateTotal(formData.assets.current);
    const nonCurrentAssets = calculateTotal(formData.assets.nonCurrent);
    return currentAssets + nonCurrentAssets;
  };

  const calculateLiabilitiesTotal = () => {
    const currentLiabilities = calculateTotal(formData.liabilities.current);
    const nonCurrentLiabilities = calculateTotal(formData.liabilities.nonCurrent);
    return currentLiabilities + nonCurrentLiabilities;
  };

  const calculateEquityTotal = () => {
    return calculateTotal(formData.equity);
  };

  const totalAssets = calculateAssetsTotal();
  const totalLiabilities = calculateLiabilitiesTotal();
  const totalEquity = calculateEquityTotal();
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  const balance = totalAssets - totalLiabilitiesAndEquity;

  const handleInputChange = (section, subsection, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: prev[section][subsection].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));

    // Clear error when user starts typing
    if (errors[`${section}_${subsection}_${index}`]) {
      setErrors(prev => ({ ...prev, [`${section}_${subsection}_${index}`]: '' }));
    }
  };

  const handlePeriodChange = (value) => {
    setFormData(prev => ({ ...prev, period: value }));
    if (errors.period) {
      setErrors(prev => ({ ...prev, period: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.period) {
      newErrors.period = 'Period is required';
    }

    // Validate all amounts are numbers
    ['assets', 'liabilities', 'equity'].forEach(section => {
      Object.keys(formData[section]).forEach(subsection => {
        formData[section][subsection].forEach((item, index) => {
          if (item.amount && isNaN(parseFloat(item.amount))) {
            newErrors[`${section}_${subsection}_${index}`] = 'Must be a valid number';
          }
        });
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically save the balance sheet data
      console.log('Creating balance sheet:', formData);
      
      // Show success message and close modal
      alert('Balance sheet created successfully!');
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      period: '',
      assets: {
        current: [
          { name: 'Cash and Cash Equivalents', amount: '' },
          { name: 'Accounts Receivable', amount: '' },
          { name: 'Inventory', amount: '' },
          { name: 'Prepaid Expenses', amount: '' },
          { name: 'Other Current Assets', amount: '' }
        ],
        nonCurrent: [
          { name: 'Property, Plant & Equipment', amount: '' },
          { name: 'Accumulated Depreciation', amount: '' },
          { name: 'Intangible Assets', amount: '' },
          { name: 'Long-term Investments', amount: '' },
          { name: 'Other Non-Current Assets', amount: '' }
        ]
      },
      liabilities: {
        current: [
          { name: 'Accounts Payable', amount: '' },
          { name: 'Accrued Expenses', amount: '' },
          { name: 'Short-term Loans', amount: '' },
          { name: 'Income Tax Payable', amount: '' },
          { name: 'Other Current Liabilities', amount: '' }
        ],
        nonCurrent: [
          { name: 'Long-term Loans', amount: '' },
          { name: 'Deferred Tax Liability', amount: '' },
          { name: 'Other Long-term Liabilities', amount: '' }
        ]
      },
      equity: [
        { name: 'Common Stock', amount: '' },
        { name: 'Retained Earnings', amount: '' },
        { name: 'Treasury Stock', amount: '' },
        { name: 'Other Comprehensive Income', amount: '' }
      ]
    });
    setErrors({});
    setActiveSection('assets');
    onClose();
  };

  const renderSection = (title, items, section, subsection) => (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {item.name}
              </label>
              <Input
                type="number"
                value={item.amount}
                onChange={(e) => handleInputChange(section, subsection, index, 'amount', e.target.value)}
                placeholder="0.00"
                error={errors[`${section}_${subsection}_${index}`]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-6xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Create Balance Sheet</h2>
                <p className="text-sm text-muted-foreground">Enter financial position data</p>
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
          {/* Period Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Balance Sheet Period *
            </label>
            <Input
              type="date"
              value={formData.period}
              onChange={(e) => handlePeriodChange(e.target.value)}
              error={errors.period}
            />
          </div>

          {/* Section Navigation */}
          <div className="flex space-x-2 border-b border-border">
            {[
              { id: 'assets', label: 'Assets', icon: 'TrendingUp' },
              { id: 'liabilities', label: 'Liabilities', icon: 'TrendingDown' },
              { id: 'equity', label: 'Equity', icon: 'DollarSign' }
            ].map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section.id
                    ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="min-h-[400px]">
            {activeSection === 'assets' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {renderSection('Current Assets', formData.assets.current, 'assets', 'current')}
                </div>
                <div>
                  {renderSection('Non-Current Assets', formData.assets.nonCurrent, 'assets', 'nonCurrent')}
                </div>
              </div>
            )}

            {activeSection === 'liabilities' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {renderSection('Current Liabilities', formData.liabilities.current, 'liabilities', 'current')}
                </div>
                <div>
                  {renderSection('Non-Current Liabilities', formData.liabilities.nonCurrent, 'liabilities', 'nonCurrent')}
                </div>
              </div>
            )}

            {activeSection === 'equity' && (
              <div>
                {renderSection('Equity', formData.equity, 'equity', '')}
              </div>
            )}
          </div>

          {/* Balance Summary */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">Balance Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Assets</p>
                <p className="font-medium text-success">{formatCurrency(totalAssets)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Liabilities</p>
                <p className="font-medium text-error">{formatCurrency(totalLiabilities)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Equity</p>
                <p className="font-medium text-primary">{formatCurrency(totalEquity)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Balance</p>
                <p className={`font-medium ${Math.abs(balance) < 1 ? 'text-success' : 'text-error'}`}>
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
            
            {Math.abs(balance) >= 1 && (
              <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <span className="text-sm text-error">
                    Assets and Liabilities + Equity must balance. Current difference: {formatCurrency(balance)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {Math.abs(balance) < 1 ? '✓ Balance sheet is balanced' : '⚠️ Balance sheet needs adjustment'}
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                iconName="Save"
                disabled={Math.abs(balance) >= 1}
              >
                Create Balance Sheet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBalanceSheetModal; 