import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialMetricsCard = ({ title, value, change, trend, icon, description, color = 'text-primary' }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
          <Icon name={icon} size={20} className={color} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default FinancialMetricsCard;