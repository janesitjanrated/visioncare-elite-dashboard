import React from 'react';
import Icon from '../../../components/AppIcon';

const InventoryStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const statCards = [
    {
      title: 'Total Products',
      value: formatNumber(stats.totalProducts),
      change: stats.productChange,
      icon: 'Package',
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Total Value',
      value: formatCurrency(stats.totalValue),
      change: stats.valueChange,
      icon: 'DollarSign',
      color: 'text-success bg-success/10'
    },
    {
      title: 'Low Stock Items',
      value: formatNumber(stats.lowStockItems),
      change: stats.lowStockChange,
      icon: 'AlertTriangle',
      color: 'text-warning bg-warning/10'
    },
    {
      title: 'Out of Stock',
      value: formatNumber(stats.outOfStockItems),
      change: stats.outOfStockChange,
      icon: 'XCircle',
      color: 'text-error bg-error/10'
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              {stat.change !== undefined && (
                <div className="flex items-center space-x-1 mt-2">
                  <Icon 
                    name={getChangeIcon(stat.change)} 
                    size={14} 
                    className={getChangeColor(stat.change)} 
                  />
                  <span className={`text-xs font-medium ${getChangeColor(stat.change)}`}>
                    {Math.abs(stat.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon name={stat.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats;