import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TaxCalculationModal = ({ isOpen, onClose, onCalculate }) => {
  const [taxData, setTaxData] = useState({
    period: '',
    revenue: '',
    expenses: '',
    deductions: '',
    taxType: 'corporate'
  });

  const [calculatedTax, setCalculatedTax] = useState(null);

  const calculateTax = () => {
    const revenue = parseFloat(taxData.revenue) || 0;
    const expenses = parseFloat(taxData.expenses) || 0;
    const deductions = parseFloat(taxData.deductions) || 0;
    
    const taxableIncome = revenue - expenses - deductions;
    
    let taxAmount = 0;
    let taxRate = 0;
    
    if (taxData.taxType === 'corporate') {
      // Corporate tax calculation (Thailand)
      if (taxableIncome <= 300000) {
        taxRate = 0.15;
        taxAmount = taxableIncome * 0.15;
      } else if (taxableIncome <= 3000000) {
        taxRate = 0.20;
        taxAmount = 45000 + (taxableIncome - 300000) * 0.20;
      } else {
        taxRate = 0.20;
        taxAmount = 585000 + (taxableIncome - 3000000) * 0.20;
      }
    } else {
      // Personal income tax calculation (simplified)
      if (taxableIncome <= 150000) {
        taxRate = 0;
        taxAmount = 0;
      } else if (taxableIncome <= 300000) {
        taxRate = 0.05;
        taxAmount = (taxableIncome - 150000) * 0.05;
      } else if (taxableIncome <= 500000) {
        taxRate = 0.10;
        taxAmount = 7500 + (taxableIncome - 300000) * 0.10;
      } else if (taxableIncome <= 750000) {
        taxRate = 0.15;
        taxAmount = 27500 + (taxableIncome - 500000) * 0.15;
      } else if (taxableIncome <= 1000000) {
        taxRate = 0.20;
        taxAmount = 65000 + (taxableIncome - 750000) * 0.20;
      } else if (taxableIncome <= 2000000) {
        taxRate = 0.25;
        taxAmount = 115000 + (taxableIncome - 1000000) * 0.25;
      } else if (taxableIncome <= 5000000) {
        taxRate = 0.30;
        taxAmount = 365000 + (taxableIncome - 2000000) * 0.30;
      } else {
        taxRate = 0.35;
        taxAmount = 1265000 + (taxableIncome - 5000000) * 0.35;
      }
    }
    
    setCalculatedTax({
      taxableIncome,
      taxAmount,
      taxRate: (taxRate * 100).toFixed(1),
      effectiveRate: taxableIncome > 0 ? ((taxAmount / taxableIncome) * 100).toFixed(1) : 0
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calculatedTax) {
      const taxRecord = {
        id: `TAX-${Date.now()}`,
        ...taxData,
        ...calculatedTax,
        status: 'calculated',
        createdAt: new Date().toISOString(),
        revenue: parseFloat(taxData.revenue),
        expenses: parseFloat(taxData.expenses),
        deductions: parseFloat(taxData.deductions)
      };
      onCalculate(taxRecord);
      onClose();
      setTaxData({
        period: '',
        revenue: '',
        expenses: '',
        deductions: '',
        taxType: 'corporate'
      });
      setCalculatedTax(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Tax Calculation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tax Period */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tax Period *
            </label>
            <Input
              value={taxData.period}
              onChange={(e) => setTaxData({...taxData, period: e.target.value})}
              placeholder="e.g., Q1 2025 or FY 2025"
              required
            />
          </div>

          {/* Tax Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tax Type *
            </label>
            <select
              value={taxData.taxType}
              onChange={(e) => setTaxData({...taxData, taxType: e.target.value})}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="corporate">Corporate Tax</option>
              <option value="personal">Personal Income Tax</option>
            </select>
          </div>

          {/* Financial Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Revenue (THB) *
              </label>
              <Input
                type="number"
                value={taxData.revenue}
                onChange={(e) => setTaxData({...taxData, revenue: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Expenses (THB) *
              </label>
              <Input
                type="number"
                value={taxData.expenses}
                onChange={(e) => setTaxData({...taxData, expenses: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Deductions (THB)
            </label>
            <Input
              type="number"
              value={taxData.deductions}
              onChange={(e) => setTaxData({...taxData, deductions: e.target.value})}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          {/* Calculate Button */}
          <div>
            <Button type="button" onClick={calculateTax} className="w-full">
              <Icon name="Calculator" size={16} className="mr-2" />
              Calculate Tax
            </Button>
          </div>

          {/* Tax Calculation Results */}
          {calculatedTax && (
            <div className="border border-border rounded-lg p-4 bg-muted/30">
              <h3 className="text-lg font-medium text-foreground mb-4">Tax Calculation Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Taxable Income:</span>
                    <span className="font-medium">฿{calculatedTax.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tax Rate:</span>
                    <span className="font-medium">{calculatedTax.taxRate}%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tax Amount:</span>
                    <span className="font-bold text-primary">฿{calculatedTax.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Effective Rate:</span>
                    <span className="font-medium">{calculatedTax.effectiveRate}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Net Income After Tax:</span>
                  <span className="font-bold text-success">
                    ฿{(calculatedTax.taxableIncome - calculatedTax.taxAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!calculatedTax}>
              <Icon name="Save" size={16} className="mr-2" />
              Save Calculation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxCalculationModal; 