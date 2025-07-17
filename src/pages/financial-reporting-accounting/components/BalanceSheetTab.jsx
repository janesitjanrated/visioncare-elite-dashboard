import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import CreateBalanceSheetModal from './CreateBalanceSheetModal';

const BalanceSheetTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock balance sheet data
  const balanceSheetData = {
    current: {
      period: 'June 30, 2025',
      assets: {
        current: [
          { name: 'Cash and Cash Equivalents', amount: 125000, change: '+5.2%' },
          { name: 'Accounts Receivable', amount: 45000, change: '-2.1%' },
          { name: 'Inventory', amount: 32000, change: '+1.8%' },
          { name: 'Prepaid Expenses', amount: 8500, change: '+0.5%' },
          { name: 'Other Current Assets', amount: 12000, change: '+3.2%' }
        ],
        nonCurrent: [
          { name: 'Property, Plant & Equipment', amount: 450000, change: '+0.0%' },
          { name: 'Accumulated Depreciation', amount: -125000, change: '+2.1%' },
          { name: 'Intangible Assets', amount: 25000, change: '+0.0%' },
          { name: 'Long-term Investments', amount: 75000, change: '+8.5%' },
          { name: 'Other Non-Current Assets', amount: 15000, change: '+0.0%' }
        ]
      },
      liabilities: {
        current: [
          { name: 'Accounts Payable', amount: 28000, change: '-1.5%' },
          { name: 'Accrued Expenses', amount: 15000, change: '+2.3%' },
          { name: 'Short-term Loans', amount: 50000, change: '-5.0%' },
          { name: 'Income Tax Payable', amount: 8500, change: '+12.5%' },
          { name: 'Other Current Liabilities', amount: 7200, change: '+1.8%' }
        ],
        nonCurrent: [
          { name: 'Long-term Loans', amount: 320000, change: '-2.1%' },
          { name: 'Deferred Tax Liability', amount: 8500, change: '+0.0%' },
          { name: 'Other Long-term Liabilities', amount: 12000, change: '+0.0%' }
        ]
      },
      equity: [
        { name: 'Common Stock', amount: 100000, change: '+0.0%' },
        { name: 'Retained Earnings', amount: 185800, change: '+15.2%' },
        { name: 'Treasury Stock', amount: -15000, change: '+0.0%' },
        { name: 'Other Comprehensive Income', amount: 2500, change: '+5.0%' }
      ]
    },
    previous: {
      period: 'March 31, 2025',
      assets: {
        current: [
          { name: 'Cash and Cash Equivalents', amount: 118750, change: '+4.8%' },
          { name: 'Accounts Receivable', amount: 46000, change: '-1.2%' },
          { name: 'Inventory', amount: 31400, change: '+2.1%' },
          { name: 'Prepaid Expenses', amount: 8450, change: '+0.3%' },
          { name: 'Other Current Assets', amount: 11600, change: '+2.8%' }
        ],
        nonCurrent: [
          { name: 'Property, Plant & Equipment', amount: 450000, change: '+0.0%' },
          { name: 'Accumulated Depreciation', amount: -122500, change: '+2.1%' },
          { name: 'Intangible Assets', amount: 25000, change: '+0.0%' },
          { name: 'Long-term Investments', amount: 69000, change: '+7.2%' },
          { name: 'Other Non-Current Assets', amount: 15000, change: '+0.0%' }
        ]
      },
      liabilities: {
        current: [
          { name: 'Accounts Payable', amount: 28400, change: '-0.8%' },
          { name: 'Accrued Expenses', amount: 14650, change: '+1.9%' },
          { name: 'Short-term Loans', amount: 52500, change: '-4.2%' },
          { name: 'Income Tax Payable', amount: 7550, change: '+10.2%' },
          { name: 'Other Current Liabilities', amount: 7070, change: '+1.5%' }
        ],
        nonCurrent: [
          { name: 'Long-term Loans', amount: 327000, change: '-1.8%' },
          { name: 'Deferred Tax Liability', amount: 8500, change: '+0.0%' },
          { name: 'Other Long-term Liabilities', amount: 12000, change: '+0.0%' }
        ]
      },
      equity: [
        { name: 'Common Stock', amount: 100000, change: '+0.0%' },
        { name: 'Retained Earnings', amount: 161300, change: '+12.8%' },
        { name: 'Treasury Stock', amount: -15000, change: '+0.0%' },
        { name: 'Other Comprehensive Income', amount: 2380, change: '+4.2%' }
      ]
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateAssetsTotal = (data) => {
    const currentAssets = calculateTotal(data.assets.current);
    const nonCurrentAssets = calculateTotal(data.assets.nonCurrent);
    return currentAssets + nonCurrentAssets;
  };

  const calculateLiabilitiesTotal = (data) => {
    const currentLiabilities = calculateTotal(data.liabilities.current);
    const nonCurrentLiabilities = calculateTotal(data.liabilities.nonCurrent);
    return currentLiabilities + nonCurrentLiabilities;
  };

  const calculateEquityTotal = (data) => {
    return calculateTotal(data.equity);
  };

  const currentData = balanceSheetData[selectedPeriod];
  const totalAssets = calculateAssetsTotal(currentData);
  const totalLiabilities = calculateLiabilitiesTotal(currentData);
  const totalEquity = calculateEquityTotal(currentData);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  const periodOptions = [
    { value: 'current', label: 'Current Period (June 30, 2025)' },
    { value: 'previous', label: 'Previous Period (March 31, 2025)' }
  ];

  const renderSection = (title, items, total, color = 'text-foreground') => (
    <div className="space-y-3">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              }`}>
                {item.change}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Total {title}</span>
          <span className={`font-bold ${color}`}>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Period
            </label>
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>As of {currentData.period}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Download">
            Export PDF
          </Button>
          <Button variant="outline" iconName="Printer">
            Print
          </Button>
          <Button onClick={() => setShowCreateModal(true)} iconName="Plus">
            Create Balance Sheet
          </Button>
        </div>
      </div>

      {/* Balance Sheet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Total Assets</h3>
              <p className="text-sm text-muted-foreground">All resources owned</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-success mb-2">{formatCurrency(totalAssets)}</div>
          <div className="text-sm text-muted-foreground">
            Current: {formatCurrency(calculateTotal(currentData.assets.current))} | 
            Non-Current: {formatCurrency(calculateTotal(currentData.assets.nonCurrent))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
              <Icon name="TrendingDown" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Total Liabilities</h3>
              <p className="text-sm text-muted-foreground">All obligations owed</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-error mb-2">{formatCurrency(totalLiabilities)}</div>
          <div className="text-sm text-muted-foreground">
            Current: {formatCurrency(calculateTotal(currentData.liabilities.current))} | 
            Non-Current: {formatCurrency(calculateTotal(currentData.liabilities.nonCurrent))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Total Equity</h3>
              <p className="text-sm text-muted-foreground">Owner's investment</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary mb-2">{formatCurrency(totalEquity)}</div>
          <div className="text-sm text-muted-foreground">
            Debt-to-Equity: {(totalLiabilities / totalEquity * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Balance Sheet Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assets */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <span>Assets</span>
          </h3>
          
          <div className="space-y-6">
            {renderSection('Current Assets', currentData.assets.current, calculateTotal(currentData.assets.current), 'text-success')}
            {renderSection('Non-Current Assets', currentData.assets.nonCurrent, calculateTotal(currentData.assets.nonCurrent), 'text-success')}
          </div>
          
          <div className="border-t-2 border-success mt-6 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">Total Assets</span>
              <span className="text-lg font-bold text-success">{formatCurrency(totalAssets)}</span>
            </div>
          </div>
        </div>

        {/* Liabilities & Equity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="TrendingDown" size={20} className="text-error" />
            <span>Liabilities & Equity</span>
          </h3>
          
          <div className="space-y-6">
            {renderSection('Current Liabilities', currentData.liabilities.current, calculateTotal(currentData.liabilities.current), 'text-error')}
            {renderSection('Non-Current Liabilities', currentData.liabilities.nonCurrent, calculateTotal(currentData.liabilities.nonCurrent), 'text-error')}
            {renderSection('Equity', currentData.equity, calculateTotal(currentData.equity), 'text-primary')}
          </div>
          
          <div className="border-t-2 border-error mt-6 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">Total Liabilities & Equity</span>
              <span className="text-lg font-bold text-error">{formatCurrency(totalLiabilitiesAndEquity)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Check */}
      <div className={`bg-card border border-border rounded-lg p-6 ${
        Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? "CheckCircle" : "AlertTriangle"} 
              size={20} 
              className={Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? "text-success" : "text-error"} 
            />
            <div>
              <h4 className="font-semibold text-foreground">Balance Check</h4>
              <p className="text-sm text-muted-foreground">
                {Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 
                  ? 'Assets = Liabilities + Equity ✓' 
                  : 'Balance sheet does not balance ⚠️'
                }
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Difference</div>
            <div className={`font-bold ${
              Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? 'text-success' : 'text-error'
            }`}>
              {formatCurrency(Math.abs(totalAssets - totalLiabilitiesAndEquity))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Balance Sheet Modal */}
      {showCreateModal && (
        <CreateBalanceSheetModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default BalanceSheetTab; 