import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      productName: "Contact Lens Solution",
      category: "Accessories",
      currentStock: 5,
      minimumStock: 20,
      alertType: "low-stock",
      supplier: "Vision Care Supplies",
      lastOrdered: "2024-12-15",
      estimatedDaysLeft: 3
    },
    {
      id: 2,
      productName: "Progressive Lenses - 1.67 Index",
      category: "Lenses",
      currentStock: 2,
      minimumStock: 10,
      alertType: "critical",
      supplier: "Premium Lens Co.",
      lastOrdered: "2024-12-20",
      estimatedDaysLeft: 1
    },
    {
      id: 3,
      productName: "Blue Light Blocking Coating",
      category: "Coatings",
      currentStock: 8,
      minimumStock: 15,
      alertType: "low-stock",
      supplier: "Optical Innovations",
      lastOrdered: "2025-01-05",
      estimatedDaysLeft: 5
    },
    {
      id: 4,
      productName: "Titanium Frames - Model TX-200",
      category: "Frames",
      currentStock: 1,
      minimumStock: 5,
      alertType: "critical",
      supplier: "Elite Eyewear",
      lastOrdered: "2024-11-30",
      estimatedDaysLeft: 0
    }
  ]);

  const getAlertColor = (alertType) => {
    switch (alertType) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out-of-stock':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getAlertIcon = (alertType) => {
    switch (alertType) {
      case 'critical':
        return 'AlertTriangle';
      case 'low-stock':
        return 'AlertCircle';
      case 'out-of-stock':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getStockPercentage = (current, minimum) => {
    return Math.round((current / minimum) * 100);
  };

  const handleReorder = (productId) => {
    console.log(`Initiating reorder for product ${productId}`);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    console.log(`Alert ${alertId} dismissed`);
  };

  const criticalAlerts = alerts.filter(alert => alert.alertType === 'critical');
  const lowStockAlerts = alerts.filter(alert => alert.alertType === 'low-stock');

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Inventory Alerts</h3>
            <p className="text-sm text-muted-foreground">
              {criticalAlerts.length} critical, {lowStockAlerts.length} low stock
            </p>
          </div>
        </div>
        <Button variant="outline" iconName="Package" iconPosition="left">
          View Inventory
        </Button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-800">Critical Stock</span>
          </div>
          <p className="text-2xl font-bold text-red-900 mt-1">{criticalAlerts.length}</p>
          <p className="text-xs text-red-600">Immediate action required</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-1">{lowStockAlerts.length}</p>
          <p className="text-xs text-yellow-600">Reorder recommended</p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertColor(alert.alertType)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon name={getAlertIcon(alert.alertType)} size={20} />
                <div className="flex-1">
                  <h4 className="font-medium">{alert.productName}</h4>
                  <p className="text-sm opacity-80 mb-2">{alert.category}</p>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <span>Stock: {alert.currentStock}/{alert.minimumStock}</span>
                    <span>Supplier: {alert.supplier}</span>
                    <span>Days left: {alert.estimatedDaysLeft}</span>
                  </div>
                  
                  {/* Stock Level Bar */}
                  <div className="mt-2">
                    <div className="w-full bg-white/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          alert.alertType === 'critical' ? 'bg-red-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.min(getStockPercentage(alert.currentStock, alert.minimumStock), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1">
                      {getStockPercentage(alert.currentStock, alert.minimumStock)}% of minimum stock
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="ShoppingCart"
                  onClick={() => handleReorder(alert.id)}
                >
                  Reorder
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="X"
                  onClick={() => handleDismissAlert(alert.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">All inventory levels are healthy!</p>
          <p className="text-sm text-muted-foreground mt-1">No alerts at this time</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Quick Actions</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="TrendingUp">
              Stock Report
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Alert Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlerts;