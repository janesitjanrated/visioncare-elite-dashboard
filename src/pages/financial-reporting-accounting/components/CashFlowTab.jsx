import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Sankey } from 'recharts';

const CashFlowTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedBranch, setSelectedBranch] = useState('all');

  // Mock cash flow data
  const cashFlowData = {
    current: {
      period: 'June 2025',
      summary: {
        openingBalance: 85000,
        closingBalance: 125000,
        netCashFlow: 40000,
        operatingCashFlow: 65000,
        investingCashFlow: -25000,
        financingCashFlow: 0
      },
      branches: {
        'Downtown Branch': {
          revenue: 280000,
          expenses: 195000,
          netCashFlow: 85000,
          categories: {
            'Patient Services': 180000,
            'Optical Sales': 85000,
            'Consultations': 15000
          },
          expenseBreakdown: {
            'Staff Salaries': 120000,
            'Rent & Utilities': 25000,
            'Inventory': 35000,
            'Marketing': 8000,
            'Equipment': 7000
          }
        },
        'Westside Branch': {
          revenue: 195000,
          expenses: 145000,
          netCashFlow: 50000,
          categories: {
            'Patient Services': 125000,
            'Optical Sales': 60000,
            'Consultations': 10000
          },
          expenseBreakdown: {
            'Staff Salaries': 85000,
            'Rent & Utilities': 20000,
            'Inventory': 25000,
            'Marketing': 8000,
            'Equipment': 7000
          }
        },
        'Northgate Branch': {
          revenue: 165000,
          expenses: 125000,
          netCashFlow: 40000,
          categories: {
            'Patient Services': 105000,
            'Optical Sales': 50000,
            'Consultations': 10000
          },
          expenseBreakdown: {
            'Staff Salaries': 75000,
            'Rent & Utilities': 18000,
            'Inventory': 20000,
            'Marketing': 7000,
            'Equipment': 5000
          }
        }
      },
      departments: {
        'Optometry': {
          revenue: 320000,
          expenses: 180000,
          netCashFlow: 140000
        },
        'Optical Sales': {
          revenue: 195000,
          expenses: 120000,
          netCashFlow: 75000
        },
        'Administration': {
          revenue: 0,
          expenses: 65000,
          netCashFlow: -65000
        },
        'Marketing': {
          revenue: 0,
          expenses: 23000,
          netCashFlow: -23000
        }
      },
      monthlyFlow: [
        { month: 'Jan', inflow: 420000, outflow: 380000, net: 40000 },
        { month: 'Feb', inflow: 435000, outflow: 395000, net: 40000 },
        { month: 'Mar', inflow: 450000, outflow: 410000, net: 40000 },
        { month: 'Apr', inflow: 465000, outflow: 425000, net: 40000 },
        { month: 'May', inflow: 480000, outflow: 440000, net: 40000 },
        { month: 'Jun', inflow: 495000, outflow: 455000, net: 40000 }
      ],
      cashFlowCategories: {
        'Operating Activities': {
          'Cash Receipts from Customers': 640000,
          'Cash Paid to Suppliers': -180000,
          'Cash Paid to Employees': -280000,
          'Cash Paid for Operating Expenses': -85000,
          'Interest Received': 5000,
          'Interest Paid': -8000,
          'Income Taxes Paid': -27000
        },
        'Investing Activities': {
          'Purchase of Equipment': -15000,
          'Purchase of Investments': -10000,
          'Proceeds from Sale of Equipment': 0
        },
        'Financing Activities': {
          'Proceeds from Loans': 0,
          'Repayment of Loans': -5000,
          'Dividends Paid': 0
        }
      }
    },
    previous: {
      period: 'May 2025',
      summary: {
        openingBalance: 75000,
        closingBalance: 85000,
        netCashFlow: 10000,
        operatingCashFlow: 55000,
        investingCashFlow: -35000,
        financingCashFlow: -10000
      },
      branches: {
        'Downtown Branch': {
          revenue: 265000,
          expenses: 185000,
          netCashFlow: 80000,
          categories: {
            'Patient Services': 170000,
            'Optical Sales': 80000,
            'Consultations': 15000
          },
          expenseBreakdown: {
            'Staff Salaries': 115000,
            'Rent & Utilities': 24000,
            'Inventory': 33000,
            'Marketing': 7500,
            'Equipment': 5500
          }
        },
        'Westside Branch': {
          revenue: 185000,
          expenses: 140000,
          netCashFlow: 45000,
          categories: {
            'Patient Services': 120000,
            'Optical Sales': 55000,
            'Consultations': 10000
          },
          expenseBreakdown: {
            'Staff Salaries': 82000,
            'Rent & Utilities': 19000,
            'Inventory': 24000,
            'Marketing': 7500,
            'Equipment': 6500
          }
        },
        'Northgate Branch': {
          revenue: 155000,
          expenses: 120000,
          netCashFlow: 35000,
          categories: {
            'Patient Services': 100000,
            'Optical Sales': 45000,
            'Consultations': 10000
          },
          expenseBreakdown: {
            'Staff Salaries': 72000,
            'Rent & Utilities': 17000,
            'Inventory': 19000,
            'Marketing': 6500,
            'Equipment': 4500
          }
        }
      },
      departments: {
        'Optometry': {
          revenue: 305000,
          expenses: 175000,
          netCashFlow: 130000
        },
        'Optical Sales': {
          revenue: 180000,
          expenses: 115000,
          netCashFlow: 65000
        },
        'Administration': {
          revenue: 0,
          expenses: 62000,
          netCashFlow: -62000
        },
        'Marketing': {
          revenue: 0,
          expenses: 22000,
          netCashFlow: -22000
        }
      },
      monthlyFlow: [
        { month: 'Jan', inflow: 400000, outflow: 360000, net: 40000 },
        { month: 'Feb', inflow: 415000, outflow: 375000, net: 40000 },
        { month: 'Mar', inflow: 430000, outflow: 390000, net: 40000 },
        { month: 'Apr', inflow: 445000, outflow: 405000, net: 40000 },
        { month: 'May', inflow: 460000, outflow: 420000, net: 40000 }
      ],
      cashFlowCategories: {
        'Operating Activities': {
          'Cash Receipts from Customers': 605000,
          'Cash Paid to Suppliers': -170000,
          'Cash Paid to Employees': -270000,
          'Cash Paid for Operating Expenses': -80000,
          'Interest Received': 4000,
          'Interest Paid': -7000,
          'Income Taxes Paid': -25000
        },
        'Investing Activities': {
          'Purchase of Equipment': -20000,
          'Purchase of Investments': -15000,
          'Proceeds from Sale of Equipment': 0
        },
        'Financing Activities': {
          'Proceeds from Loans': 0,
          'Repayment of Loans': -10000,
          'Dividends Paid': 0
        }
      }
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

  const currentData = cashFlowData[selectedPeriod];
  const branches = Object.keys(currentData.branches);
  const departments = Object.keys(currentData.departments);

  const periodOptions = [
    { value: 'current', label: 'Current Period (June 2025)' },
    { value: 'previous', label: 'Previous Period (May 2025)' }
  ];

  const viewOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'branches', label: 'By Branches' },
    { value: 'departments', label: 'By Departments' },
    { value: 'categories', label: 'Cash Flow Categories' }
  ];

  const branchOptions = [
    { value: 'all', label: 'All Branches' },
    ...branches.map(branch => ({ value: branch, label: branch }))
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Cash Flow Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Opening Balance</h3>
              <p className="text-sm text-muted-foreground">Beginning of period</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-success">{formatCurrency(currentData.summary.openingBalance)}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Net Cash Flow</h3>
              <p className="text-sm text-muted-foreground">Period change</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">{formatCurrency(currentData.summary.netCashFlow)}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="Target" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Closing Balance</h3>
              <p className="text-sm text-muted-foreground">End of period</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-accent">{formatCurrency(currentData.summary.closingBalance)}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Operating Cash</h3>
              <p className="text-sm text-muted-foreground">Core operations</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-warning">{formatCurrency(currentData.summary.operatingCashFlow)}</div>
        </div>
      </div>

      {/* Monthly Cash Flow Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Cash Flow Trend</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData.monthlyFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [formatCurrency(value), '']}
              />
              <Line type="monotone" dataKey="inflow" stroke="#10B981" strokeWidth={3} name="Cash Inflow" />
              <Line type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={3} name="Cash Outflow" />
              <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={3} name="Net Cash Flow" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(currentData.cashFlowCategories).map(([category, items]) => (
          <div key={category} className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
            <div className="space-y-3">
              {Object.entries(items).map(([item, amount]) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item}</span>
                  <span className={`text-sm font-medium ${
                    amount >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {formatCurrency(amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className={`font-bold ${
                  Object.values(items).reduce((sum, val) => sum + val, 0) >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {formatCurrency(Object.values(items).reduce((sum, val) => sum + val, 0))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBranches = () => (
    <div className="space-y-6">
      {/* Branch Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map(branch => {
          const branchData = currentData.branches[branch];
          return (
            <div key={branch} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Building2" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{branch}</h3>
                  <p className="text-sm text-muted-foreground">Branch performance</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="text-sm font-medium text-success">{formatCurrency(branchData.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expenses</span>
                  <span className="text-sm font-medium text-error">{formatCurrency(branchData.expenses)}</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Net Cash Flow</span>
                    <span className={`font-bold ${
                      branchData.netCashFlow >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatCurrency(branchData.netCashFlow)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Branch Revenue Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Revenue by Branch</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={branches.map(branch => ({
              branch,
              revenue: currentData.branches[branch].revenue,
              expenses: currentData.branches[branch].expenses
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="branch" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [formatCurrency(value), '']}
              />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch Revenue Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {branches.map(branch => {
          const branchData = currentData.branches[branch];
          const categoryData = Object.entries(branchData.categories).map(([name, value]) => ({
            name,
            value
          }));
          
          return (
            <div key={branch} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">{branch} - Revenue Sources</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#F59E0B'][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'][index % 3] }}
                      ></div>
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      {/* Department Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map(dept => {
          const deptData = currentData.departments[dept];
          return (
            <div key={dept} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  deptData.netCashFlow >= 0 ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={deptData.netCashFlow >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={20} 
                    className={deptData.netCashFlow >= 0 ? "text-success" : "text-error"} 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{dept}</h3>
                  <p className="text-sm text-muted-foreground">Department cash flow</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="text-sm font-medium text-success">{formatCurrency(deptData.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expenses</span>
                  <span className="text-sm font-medium text-error">{formatCurrency(deptData.expenses)}</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Net Cash Flow</span>
                    <span className={`font-bold ${
                      deptData.netCashFlow >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatCurrency(deptData.netCashFlow)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Performance Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Department Cash Flow Performance</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departments.map(dept => ({
              department: dept,
              revenue: currentData.departments[dept].revenue,
              expenses: currentData.departments[dept].expenses,
              netCashFlow: currentData.departments[dept].netCashFlow
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="department" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [formatCurrency(value), '']}
              />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              <Bar dataKey="netCashFlow" fill="#3B82F6" name="Net Cash Flow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      {/* Cash Flow Categories Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(currentData.cashFlowCategories).map(([category, items]) => {
          const total = Object.values(items).reduce((sum, val) => sum + val, 0);
          return (
            <div key={category} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
              <div className="space-y-3">
                {Object.entries(items).map(([item, amount]) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item}</span>
                    <span className={`text-sm font-medium ${
                      amount >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className={`font-bold ${
                    total >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedView) {
      case 'overview':
        return renderOverview();
      case 'branches':
        return renderBranches();
      case 'departments':
        return renderDepartments();
      case 'categories':
        return renderCategories();
      default:
        return renderOverview();
    }
  };

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
              onChange={(value) => setSelectedPeriod(value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              View
            </label>
            <Select
              options={viewOptions}
              value={selectedView}
              onChange={(value) => setSelectedView(value)}
            />
          </div>
          {selectedView === 'branches' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Branch Filter
              </label>
              <Select
                options={branchOptions}
                value={selectedBranch}
                onChange={(value) => setSelectedBranch(value)}
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
          <Button variant="outline" iconName="Printer">
            Print
          </Button>
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default CashFlowTab; 