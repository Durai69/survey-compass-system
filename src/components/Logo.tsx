
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg'; showTitle?: boolean }> = ({ 
  size = 'md',
  showTitle = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const titleClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <img 
          src="/lovable-uploads/d0ec51f6-1118-4cd5-890a-98926f6b603b.png" 
          alt="Lakshmi Life Sciences Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {showTitle && (
        <span className={`mt-2 ${titleClasses[size]} font-semibold text-gray-700 text-center`}>
          LAKSHMI LIFE SCIENCES
        </span>
      )}
    </div>
  );
};

export default Logo;
