
import React from 'react';
import { cn } from '@/lib/utils';

interface MenuCardProps {
  title: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary';
  backgroundImage?: string;
  className?: string;
}

const MenuCard = ({ title, icon, variant, backgroundImage, className }: MenuCardProps) => {
  return (
    <div 
      className={cn(
        "relative h-24 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer",
        variant === 'primary' ? 'bg-teal-700 text-white' : 'bg-gray-100 text-gray-700',
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="mb-2">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-center">{title}</h3>
      </div>
    </div>
  );
};

export default MenuCard;
