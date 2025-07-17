import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'appointment',
      title: 'New appointment scheduled',
      description: 'Sarah Johnson - Eye examination',
      time: '5 minutes ago',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '$450 from Michael Rodriguez',
      time: '12 minutes ago',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Low stock alert',
      description: 'Contact lenses - Only 5 units left',
      time: '25 minutes ago',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 4,
      type: 'staff',
      title: 'Staff check-in',
      description: 'Dr. Emily Chen started shift',
      time: '1 hour ago',
      icon: 'Users',
      color: 'accent'
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Prescription completed',
      description: 'Progressive lenses for David Kim',
      time: '2 hours ago',
      icon: 'FileText',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      accent: 'bg-accent/10 text-accent'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest clinic updates</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-hover">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-hover">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;