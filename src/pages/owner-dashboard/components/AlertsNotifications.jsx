import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsNotifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Low Inventory Alert',
      message: 'Contact lenses stock is critically low (5 units remaining)',
      time: '5 minutes ago',
      action: 'Reorder Now',
      dismissed: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Overdue Payment',
      message: 'Invoice #INV-2024-0156 is 15 days overdue ($450)',
      time: '2 hours ago',
      action: 'Send Reminder',
      dismissed: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Staff Schedule Conflict',
      message: 'Dr. Emily Chen has overlapping appointments tomorrow',
      time: '4 hours ago',
      action: 'Resolve',
      dismissed: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Monthly Target Achieved',
      message: 'Revenue target of $50,000 reached 5 days early',
      time: '1 day ago',
      action: 'View Report',
      dismissed: false
    }
  ]);

  const getAlertStyles = (type) => {
    const styles = {
      critical: {
        bg: 'bg-error/10',
        border: 'border-error/20',
        icon: 'AlertTriangle',
        iconColor: 'text-error',
        titleColor: 'text-error'
      },
      warning: {
        bg: 'bg-warning/10',
        border: 'border-warning/20',
        icon: 'AlertCircle',
        iconColor: 'text-warning',
        titleColor: 'text-warning'
      },
      info: {
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        icon: 'Info',
        iconColor: 'text-primary',
        titleColor: 'text-primary'
      },
      success: {
        bg: 'bg-success/10',
        border: 'border-success/20',
        icon: 'CheckCircle',
        iconColor: 'text-success',
        titleColor: 'text-success'
      }
    };
    return styles[type] || styles.info;
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const criticalCount = activeAlerts.filter(alert => alert.type === 'critical').length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Alerts & Notifications</h3>
          {criticalCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {criticalCount} Critical
            </span>
          )}
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-hover">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">All caught up! No active alerts.</p>
          </div>
        ) : (
          activeAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            return (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${styles.bg} ${styles.border} transition-all duration-200`}
              >
                <div className="flex items-start space-x-3">
                  <Icon name={styles.icon} size={20} className={styles.iconColor} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`text-sm font-semibold ${styles.titleColor}`}>
                        {alert.title}
                      </h4>
                      <button 
                        onClick={() => dismissAlert(alert.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-foreground mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <Button 
                        variant={alert.type === 'critical' ? 'destructive' : 'outline'} 
                        size="sm"
                      >
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alert Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-error">{alerts.filter(a => a.type === 'critical' && !a.dismissed).length}</p>
            <p className="text-xs text-muted-foreground">Critical</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-warning">{alerts.filter(a => a.type === 'warning' && !a.dismissed).length}</p>
            <p className="text-xs text-muted-foreground">Warning</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{alerts.filter(a => a.type === 'info' && !a.dismissed).length}</p>
            <p className="text-xs text-muted-foreground">Info</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">{alerts.filter(a => a.type === 'success' && !a.dismissed).length}</p>
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;