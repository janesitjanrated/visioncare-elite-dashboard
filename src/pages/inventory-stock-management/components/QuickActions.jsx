import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const quickActions = [
    {
      id: 'add_product',
      title: 'Add New Product',
      description: 'Add a new product to inventory',
      icon: 'Plus',
      color: 'text-primary bg-primary/10 hover:bg-primary/20'
    },
    {
      id: 'bulk_update',
      title: 'Bulk Update',
      description: 'Update multiple products at once',
      icon: 'Edit',
      color: 'text-accent bg-accent/10 hover:bg-accent/20'
    },
    {
      id: 'barcode_scan',
      title: 'Barcode Scanner',
      description: 'Scan products for quick updates',
      icon: 'Scan',
      color: 'text-secondary bg-secondary/10 hover:bg-secondary/20'
    },
    {
      id: 'generate_report',
      title: 'Generate Report',
      description: 'Create inventory reports',
      icon: 'FileText',
      color: 'text-success bg-success/10 hover:bg-success/20'
    },
    {
      id: 'cycle_count',
      title: 'Cycle Count',
      description: 'Perform inventory cycle counting',
      icon: 'RotateCcw',
      color: 'text-warning bg-warning/10 hover:bg-warning/20'
    },
    {
      id: 'supplier_orders',
      title: 'Supplier Orders',
      description: 'Manage supplier orders',
      icon: 'Truck',
      color: 'text-purple-600 bg-purple-100 hover:bg-purple-200'
    }
  ];

  const handleActionClick = (actionId) => {
    if (actionId === 'barcode_scan') {
      setShowBarcodeScanner(true);
    } else {
      onAction(actionId);
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Frequently used inventory operations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className={`p-4 rounded-lg border border-border transition-all hover:border-primary/20 text-left group ${action.color}`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-current/10">
                  <Icon name={action.icon} size={20} className="text-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-current transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-current transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      {showBarcodeScanner && (
        <div className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4">
          <div className="bg-popover rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-popover-foreground">Barcode Scanner</h3>
                <button
                  onClick={() => setShowBarcodeScanner(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-hover"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Scan" size={48} className="text-muted-foreground" />
                </div>
                <h4 className="font-medium text-popover-foreground mb-2">Scanner Ready</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Position the barcode within the scanner area
                </p>
                <div className="space-y-3">
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Camera"
                    onClick={() => {
                      onAction('barcode_scan');
                      setShowBarcodeScanner(false);
                    }}
                  >
                    Start Scanning
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowBarcodeScanner(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;