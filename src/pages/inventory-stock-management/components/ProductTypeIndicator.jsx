import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductTypeIndicator = ({ type, isCustom }) => {
  if (isCustom) {
    return (
      <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
        <Icon name="Wrench" size={12} />
        <span>Custom</span>
      </div>
    );
  }

  const typeConfig = {
    frames: { icon: 'Glasses', label: 'Frames', color: 'text-blue-600 bg-blue-50' },
    lenses: { icon: 'Eye', label: 'Lenses', color: 'text-green-600 bg-green-50' },
    accessories: { icon: 'Package', label: 'Accessories', color: 'text-purple-600 bg-purple-50' },
    solutions: { icon: 'Droplets', label: 'Solutions', color: 'text-cyan-600 bg-cyan-50' }
  };

  const config = typeConfig[type] || typeConfig.accessories;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${config.color}`}>
      <Icon name={config.icon} size={12} />
      <span>{config.label}</span>
    </div>
  );
};

export default ProductTypeIndicator;