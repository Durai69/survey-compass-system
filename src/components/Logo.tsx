
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <img 
          src="/lovable-uploads/d0ec51f6-1118-4cd5-890a-98926f6b603b.png" 
          alt="Lakshmi Life Sciences Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {size === 'lg' && (
        <span className="ml-2 text-lg font-semibold text-gray-700">LAKSHMI LIFE SCIENCES</span>
      )}
    </div>
  );
};

export default Logo;
