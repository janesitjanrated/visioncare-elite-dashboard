import React from 'react';

const StockStatusBadge = ({ status, quantity, reorderPoint }) => {
  const getStatusConfig = () => {
    if (quantity === 0) {
      return {
        label: 'Out of Stock',
        className: 'bg-error text-error-foreground',
        dotColor: 'bg-error'
      };
    } else if (quantity <= reorderPoint) {
      return {
        label: 'Low Stock',
        className: 'bg-warning text-warning-foreground',
        dotColor: 'bg-warning'
      };
    } else if (status === 'discontinued') {
      return {
        label: 'Discontinued',
        className: 'bg-muted text-muted-foreground',
        dotColor: 'bg-muted-foreground'
      };
    } else if (status === 'pending_order') {
      return {
        label: 'Pending Order',
        className: 'bg-secondary text-secondary-foreground',
        dotColor: 'bg-secondary'
      };
    } else {
      return {
        label: 'In Stock',
        className: 'bg-success text-success-foreground',
        dotColor: 'bg-success'
      };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      <span>{config.label}</span>
    </div>
  );
};

export default StockStatusBadge;