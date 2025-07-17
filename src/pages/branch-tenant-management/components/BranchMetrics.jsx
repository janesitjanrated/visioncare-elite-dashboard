import React from 'react';
import Icon from '../../../components/AppIcon';

const BranchMetrics = ({ branches }) => {
  const totalRevenue = branches.reduce((sum, branch) => sum + branch.dailyRevenue, 0);
  const totalPatients = branches.reduce((sum, branch) => sum + branch.patientCount, 0);
  const totalStaff = branches.reduce((sum, branch) => sum + branch.staffCount, 0);
  const averagePerformance = branches.reduce((sum, branch) => sum + branch.performance, 0) / branches.length;
  const activeBranches = branches.filter(branch => branch.status === 'active').length;

  const metrics = [
    {
      label: 'Total Daily Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      label: 'Total Patients Today',
      value: totalPatients.toString(),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+8.3%',
      changeType: 'positive'
    },
    {
      label: 'Total Staff Members',
      value: totalStaff.toString(),
      icon: 'UserCheck',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      label: 'Average Performance',
      value: `${averagePerformance.toFixed(1)}%`,
      icon: 'TrendingUp',
      color: averagePerformance >= 80 ? 'text-success' : averagePerformance >= 60 ? 'text-warning' : 'text-error',
      bgColor: averagePerformance >= 80 ? 'bg-success/10' : averagePerformance >= 60 ? 'bg-warning/10' : 'bg-error/10',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      label: 'Active Branches',
      value: `${activeBranches}/${branches.length}`,
      icon: 'Building2',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: 'Stable',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={metric.icon} size={24} className={metric.color} />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              metric.changeType === 'positive' ? 'bg-success/10 text-success' :
              metric.changeType === 'negative'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
            }`}>
              {metric.change}
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchMetrics;