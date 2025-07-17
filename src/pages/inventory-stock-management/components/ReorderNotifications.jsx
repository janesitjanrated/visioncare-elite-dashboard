import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReorderNotifications = ({ notifications, onReorder, onDismiss, onReorderAll }) => {
  const [expandedNotification, setExpandedNotification] = useState(null);

  if (!notifications || notifications.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">All Stock Levels Good</h3>
          <p className="text-muted-foreground">No items require reordering at this time.</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Package';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Reorder Notifications</h2>
              <p className="text-sm text-muted-foreground">
                {notifications.length} item{notifications.length > 1 ? 's' : ''} need reordering
              </p>
            </div>
          </div>
          {notifications.length > 1 && (
            <Button
              variant="default"
              iconName="ShoppingCart"
              onClick={onReorderAll}
            >
              Reorder All
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-6">
            <div className="flex items-start space-x-4">
              {/* Priority Indicator */}
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getPriorityColor(notification.priority)}`}>
                <Icon name={getPriorityIcon(notification.priority)} size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{notification.productName}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{notification.sku}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      onClick={() => setExpandedNotification(
                        expandedNotification === notification.id ? null : notification.id
                      )}
                    >
                      Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ShoppingCart"
                      onClick={() => onReorder(notification)}
                    >
                      Reorder
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => onDismiss(notification.id)}
                    />
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Current Stock:</span>
                    <span className="ml-2 font-medium text-foreground">{notification.currentStock}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reorder Point:</span>
                    <span className="ml-2 font-medium text-foreground">{notification.reorderPoint}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Suggested Qty:</span>
                    <span className="ml-2 font-medium text-foreground">{notification.suggestedQuantity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Cost:</span>
                    <span className="ml-2 font-medium text-foreground">{formatCurrency(notification.estimatedCost)}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedNotification === notification.id && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Supplier Information</h4>
                        <div className="space-y-1">
                          <div>
                            <span className="text-muted-foreground">Supplier:</span>
                            <span className="ml-2 text-foreground">{notification.supplier}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Contact:</span>
                            <span className="ml-2 text-foreground">{notification.supplierContact}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Lead Time:</span>
                            <span className="ml-2 text-foreground">{notification.leadTime} days</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Stock Analysis</h4>
                        <div className="space-y-1">
                          <div>
                            <span className="text-muted-foreground">Last Order:</span>
                            <span className="ml-2 text-foreground">{notification.lastOrderDate}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg. Monthly Sales:</span>
                            <span className="ml-2 text-foreground">{notification.avgMonthlySales}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Days Until Out:</span>
                            <span className="ml-2 text-foreground">{notification.daysUntilOut}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {notification.notes && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">{notification.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReorderNotifications;