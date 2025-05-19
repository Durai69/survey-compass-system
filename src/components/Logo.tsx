
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
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15ZM50 25C63.8 25 75 36.2 75 50C75 63.8 63.8 75 50 75C36.2 75 25 63.8 25 50C25 36.2 36.2 25 50 25Z"
              fill="#FFD700"
            />
            <path
              d="M35 40C35 32.82 40.82 27 48 27C55.18 27 61 32.82 61 40C61 47.18 55.18 53 48 53"
              stroke="#FFD700"
              strokeWidth="6"
            />
            <path
              d="M65 60C65 67.18 59.18 73 52 73C44.82 73 39 67.18 39 60C39 52.82 44.82 47 52 47"
              stroke="#FFD700"
              strokeWidth="6"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center text-xs font-bold text-blue-900">LLS</div>
      </div>
      {size === 'lg' && (
        <span className="ml-2 text-lg font-semibold text-gray-700">LAKSHMI LIFE SCIENCES</span>
      )}
    </div>
  );
};

export default Logo;
