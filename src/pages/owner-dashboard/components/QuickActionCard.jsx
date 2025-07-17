import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, color = 'primary', badge }) => {
  const navigate = useNavigate();

  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary/5 border-primary/20 hover:bg-primary/10',
      success: 'bg-success/5 border-success/20 hover:bg-success/10',
      warning: 'bg-warning/5 border-warning/20 hover:bg-warning/10',
      accent: 'bg-accent/5 border-accent/20 hover:bg-accent/10'
    };
    return colors[colorType] || colors.primary;
  };

  const getIconColor = (colorType) => {
    const colors = {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      accent: 'text-accent'
    };
    return colors[colorType] || colors.primary;
  };

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={`relative bg-card border rounded-lg p-6 cursor-pointer transition-all duration-200 ${getColorClasses(color)}`} onClick={handleClick}>
      {badge && (
        <div className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
          {badge}
        </div>
      )}
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center ${getIconColor(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
            Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;