import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const BusinessOverviewTab = () => {
  const navigate = useNavigate();
  const revenueData = [
    { month: 'Jan', revenue: 45000, profit: 12000, expenses: 33000 },
    { month: 'Feb', revenue: 52000, profit: 15000, expenses: 37000 },
    { month: 'Mar', revenue: 48000, profit: 13500, expenses: 34500 },
    { month: 'Apr', revenue: 58000, profit: 18000, expenses: 40000 },
    { month: 'May', revenue: 62000, profit: 20000, expenses: 42000 },
    { month: 'Jun', revenue: 55000, profit: 16500, expenses: 38500 }
  ];

  const cashFlowData = [
    { month: 'Jan', inflow: 45000, outflow: 38000 },
    { month: 'Feb', inflow: 52000, outflow: 41000 },
    { month: 'Mar', inflow: 48000, outflow: 39000 },
    { month: 'Apr', inflow: 58000, outflow: 44000 },
    { month: 'May', inflow: 62000, outflow: 47000 },
    { month: 'Jun', inflow: 55000, outflow: 43000 }
  ];

  const expenseBreakdown = [
    { name: 'Inventory', value: 35, color: '#2563EB' },
    { name: 'Salaries', value: 30, color: '#059669' },
    { name: 'Rent', value: 15, color: '#F59E0B' },
    { name: 'Utilities', value: 10, color: '#EF4444' },
    { name: 'Marketing', value: 10, color: '#8B5CF6' }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '$320,000',
      change: '+12.5%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      title: 'Net Profit',
      value: '$95,000',
      change: '+8.3%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-success'
    },
    {
      title: 'Cash Flow',
      value: '$45,000',
      change: '-2.1%',
      trend: 'down',
      icon: 'ArrowUpDown',
      color: 'text-warning'
    },
    {
      title: 'Profit Margin',
      value: '29.7%',
      change: '+1.2%',
      trend: 'up',
      icon: 'Percent',
      color: 'text-success'
    }
  ];

  const loanData = [
    {
      id: 1,
      lender: 'First National Bank',
      amount: '$150,000',
      remaining: '$120,000',
      rate: '4.5%',
      nextPayment: '2025-08-15',
      status: 'current'
    },
    {
      id: 2,
      lender: 'Equipment Finance Co.',
      amount: '$75,000',
      remaining: '$45,000',
      rate: '6.2%',
      nextPayment: '2025-08-01',
      status: 'current'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                <Icon name={kpi.icon} size={20} className="text-primary" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${kpi.color}`}>
                <Icon name={kpi.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                <span>{kpi.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Revenue & Profit Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Profit</span>
              </div>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cash Flow Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Cash Flow Analysis</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Inflow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-muted-foreground">Outflow</span>
              </div>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="inflow" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Expense Breakdown</h3>
          <div className="w-full h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {expenseBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Overview */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Loan Overview</h3>
            <button 
              onClick={() => navigate('/loans-management')}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-hover"
            >
              View All Loans
            </button>
          </div>
          <div className="space-y-4">
            {loanData.map((loan) => (
              <div key={loan.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{loan.lender}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    loan.status === 'current' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {loan.status === 'current' ? 'Current' : 'Overdue'}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Original Amount</p>
                    <p className="font-medium text-foreground">{loan.amount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-medium text-foreground">{loan.remaining}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Interest Rate</p>
                    <p className="font-medium text-foreground">{loan.rate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Payment</p>
                    <p className="font-medium text-foreground">{loan.nextPayment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverviewTab;