import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display font-bold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-brand-teal text-white hover:bg-brand-dark focus:ring-brand-teal shadow-lg shadow-brand-teal/30",
    secondary: "bg-brand-buff text-white hover:bg-orange-600 focus:ring-brand-buff shadow-lg shadow-brand-buff/30",
    outline: "border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white",
    white: "bg-white text-brand-teal hover:bg-gray-50 shadow-md"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <span className="inline-block py-1 px-3 rounded-full bg-brand-sand text-brand-dark text-sm font-bold uppercase tracking-wider mb-3">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-display font-extrabold text-brand-dark mb-4">
      {title}
    </h2>
    <div className={`h-2 w-24 bg-brand-buff rounded-full ${centered ? 'mx-auto' : ''}`} />
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl shadow-xl shadow-brand-dark/5 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);
