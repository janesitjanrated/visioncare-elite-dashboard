import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const TaxOptimizedTab = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedQuarter, setSelectedQuarter] = useState('Q2');

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' }
  ];

  const quarterOptions = [
    { value: 'Q1', label: 'Q1 (Jan-Mar)' },
    { value: 'Q2', label: 'Q2 (Apr-Jun)' },
    { value: 'Q3', label: 'Q3 (Jul-Sep)' },
    { value: 'Q4', label: 'Q4 (Oct-Dec)' }
  ];

  const taxSummary = {
    grossIncome: 320000,
    totalDeductions: 95000,
    taxableIncome: 225000,
    estimatedTax: 67500,
    quarterlyPayments: 16875,
    taxSavings: 28500
  };

  const deductionCategories = [
    {
      category: 'Business Equipment',
      amount: 25000,
      percentage: 26.3,
      items: ['Optical equipment', 'Computer systems', 'Furniture'],
      maxDeduction: 30000,
      status: 'optimized'
    },
    {
      category: 'Professional Services',
      amount: 18000,
      percentage: 18.9,
      items: ['Legal fees', 'Accounting services', 'Consulting'],
      maxDeduction: 20000,
      status: 'can-improve'
    },
    {
      category: 'Office Expenses',
      amount: 15000,
      percentage: 15.8,
      items: ['Rent', 'Utilities', 'Office supplies'],
      maxDeduction: 15000,
      status: 'optimized'
    },
    {
      category: 'Marketing & Advertising',
      amount: 12000,
      percentage: 12.6,
      items: ['Digital marketing', 'Print ads', 'Website'],
      maxDeduction: 15000,
      status: 'can-improve'
    },
    {
      category: 'Training & Education',
      amount: 8000,
      percentage: 8.4,
      items: ['Professional courses', 'Certifications', 'Conferences'],
      maxDeduction: 10000,
      status: 'can-improve'
    },
    {
      category: 'Insurance',
      amount: 17000,
      percentage: 17.9,
      items: ['Liability insurance', 'Property insurance', 'Health insurance'],
      maxDeduction: 17000,
      status: 'optimized'
    }
  ];

  const complianceChecklist = [
    {
      item: 'Quarterly Tax Payments',
      status: 'completed',
      dueDate: '2025-07-15',
      description: 'Q2 2025 estimated tax payment submitted'
    },
    {
      item: 'Sales Tax Filing',
      status: 'pending',
      dueDate: '2025-07-20',
      description: 'Monthly sales tax return for June 2025'
    },
    {
      item: 'Payroll Tax Deposits',
      status: 'completed',
      dueDate: '2025-07-15',
      description: 'Employee payroll taxes deposited'
    },
    {
      item: 'Annual Tax Return',
      status: 'upcoming',
      dueDate: '2026-03-15',
      description: '2025 business tax return preparation'
    },
    {
      item: 'Depreciation Schedule',
      status: 'completed',
      dueDate: '2025-06-30',
      description: 'Equipment depreciation calculations updated'
    }
  ];

  const auditDocuments = [
    {
      category: 'Income Records',
      documents: ['Patient invoices', 'Insurance payments', 'Cash receipts'],
      completeness: 98,
      lastUpdated: '2025-07-10'
    },
    {
      category: 'Expense Documentation',
      documents: ['Vendor invoices', 'Receipt records', 'Bank statements'],
      completeness: 95,
      lastUpdated: '2025-07-09'
    },
    {
      category: 'Payroll Records',
      documents: ['Employee timesheets', 'Payroll registers', 'Tax withholdings'],
      completeness: 100,
      lastUpdated: '2025-07-08'
    },
    {
      category: 'Asset Records',
      documents: ['Purchase receipts', 'Depreciation schedules', 'Disposal records'],
      completeness: 92,
      lastUpdated: '2025-07-05'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'upcoming':
        return 'bg-primary/10 text-primary';
      case 'optimized':
        return 'bg-success/10 text-success';
      case 'can-improve':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Tax Period Selection</h3>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Tax Summary
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select
            label="Tax Year"
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
            className="w-32"
          />
          
          <Select
            label="Quarter"
            options={quarterOptions}
            value={selectedQuarter}
            onChange={setSelectedQuarter}
            className="w-40"
          />
          
          <Button variant="default" iconName="RefreshCw" iconPosition="left">
            Update Calculations
          </Button>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Icon name="DollarSign" size={24} className="text-primary" />
            <span className="text-sm text-success font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {formatCurrency(taxSummary.grossIncome)}
          </h3>
          <p className="text-sm text-muted-foreground">Gross Income</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Icon name="Minus" size={24} className="text-accent" />
            <span className="text-sm text-success font-medium">+8.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {formatCurrency(taxSummary.totalDeductions)}
          </h3>
          <p className="text-sm text-muted-foreground">Total Deductions</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Icon name="Calculator" size={24} className="text-warning" />
            <span className="text-sm text-warning font-medium">-5.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {formatCurrency(taxSummary.estimatedTax)}
          </h3>
          <p className="text-sm text-muted-foreground">Estimated Tax</p>
        </div>
      </div>

      {/* Deduction Optimization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Deduction Optimization</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Potential Savings:</span>
            <span className="text-lg font-bold text-success">{formatCurrency(taxSummary.taxSavings)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {deductionCategories.map((category, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{category.category}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                  {category.status === 'optimized' ? 'Optimized' : 'Can Improve'}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Current: {formatCurrency(category.amount)}</span>
                  <span className="text-muted-foreground">Max: {formatCurrency(category.maxDeduction)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.status === 'optimized' ? 'bg-success' : 'bg-warning'}`}
                    style={{ width: `${(category.amount / category.maxDeduction) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Audit Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Checklist */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Compliance Checklist</h3>
          
          <div className="space-y-4">
            {complianceChecklist.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.status === 'completed' ? 'bg-success' :
                  item.status === 'pending' ? 'bg-warning' : 'bg-primary'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{item.item}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                  <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Documentation */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Audit Documentation</h3>
          
          <div className="space-y-4">
            {auditDocuments.map((doc, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{doc.category}</h4>
                  <span className="text-sm font-medium text-foreground">{doc.completeness}%</span>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        doc.completeness >= 95 ? 'bg-success' : 
                        doc.completeness >= 85 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${doc.completeness}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1 mb-3">
                  {doc.documents.map((document, docIndex) => (
                    <div key={docIndex} className="flex items-center space-x-2">
                      <Icon name="FileText" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{document}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground">Last updated: {doc.lastUpdated}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Optimization Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-1" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Tax Optimization Recommendations</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Consider increasing equipment purchases before year-end for additional depreciation deductions</li>
              <li>• Review professional development expenses - you have {formatCurrency(2000)} remaining in this category</li>
              <li>• Evaluate marketing spend optimization for better tax efficiency</li>
              <li>• Schedule quarterly tax planning sessions to maximize deductions throughout the year</li>
              <li>• Maintain detailed records for all business expenses to ensure audit readiness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxOptimizedTab;