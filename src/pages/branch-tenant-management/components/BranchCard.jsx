import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BranchCard = ({ branch, onEdit, onViewDetails, onTransferStaff }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'inactive': return 'bg-error';
      case 'maintenance': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 80) return 'text-success';
    if (performance >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-modal transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(branch.status)}`} />
          <div>
            <h3 className="text-lg font-semibold text-foreground">{branch.name}</h3>
            <p className="text-sm text-muted-foreground">{branch.address}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(branch)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onViewDetails(branch)}
          >
            Details
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2">
            <Icon name="DollarSign" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">${branch.dailyRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Daily Revenue</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mx-auto mb-2">
            <Icon name="Users" size={20} className="text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">{branch.patientCount}</p>
          <p className="text-xs text-muted-foreground">Patients Today</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg mx-auto mb-2">
            <Icon name="UserCheck" size={20} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{branch.staffCount}</p>
          <p className="text-xs text-muted-foreground">Staff Members</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg mx-auto mb-2">
            <Icon name="Package" size={20} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">{branch.inventoryItems}</p>
          <p className="text-xs text-muted-foreground">Inventory Items</p>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className={getPerformanceColor(branch.performance)} />
          <span className="text-sm font-medium text-foreground">Performance</span>
        </div>
        <span className={`text-sm font-bold ${getPerformanceColor(branch.performance)}`}>
          {branch.performance}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            branch.performance >= 80 ? 'bg-success' :
            branch.performance >= 60 ? 'bg-warning' : 'bg-error'
          }`}
          style={{ width: `${branch.performance}%` }}
        />
      </div>

      {/* Operating Hours */}
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-muted-foreground">Operating Hours:</span>
        <span className="text-foreground font-medium">{branch.operatingHours}</span>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Users"
          onClick={() => onTransferStaff(branch)}
          className="flex-1"
        >
          Transfer Staff
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="MapPin"
        >
          View Map
        </Button>
      </div>
    </div>
  );
};

export default BranchCard;