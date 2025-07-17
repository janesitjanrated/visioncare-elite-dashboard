import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialOverview = () => {
  const financialData = [
    { name: 'Eye Exams', value: 35, amount: 25200, color: '#2563EB' },
    { name: 'Frames & Lenses', value: 45, amount: 32400, color: '#059669' },
    { name: 'Contact Lenses', value: 15, amount: 10800, color: '#F59E0B' },
    { name: 'Accessories', value: 5, amount: 3600, color: '#EF4444' }
  ];

  const totalRevenue = financialData.reduce((sum, item) => sum + item.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground">{data.name}</p>
          <p className="text-sm text-primary">${data.amount.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{data.value}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Breakdown</h3>
          <p className="text-sm text-muted-foreground">Current month distribution</p>
        </div>
        <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
          Full Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={financialData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {financialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Details */}
        <div className="space-y-4">
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          
          <div className="space-y-3">
            {financialData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${item.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial System Access */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Financial Management</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Business Overview</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-accent/5 border border-accent/20 rounded-lg hover:bg-accent/10 transition-colors">
            <Icon name="BarChart3" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Detailed Reports</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-warning/5 border border-warning/20 rounded-lg hover:bg-warning/10 transition-colors">
            <Icon name="Calculator" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Tax Optimization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;