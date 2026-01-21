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
    primary: "bg-brand-green text-white hover:bg-brand-brown focus:ring-brand-green shadow-lg shadow-brand-green/30",
    secondary: "bg-brand-brown text-white hover:bg-black focus:ring-brand-brown shadow-lg shadow-brand-brown/30",
    outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
    white: "bg-white text-brand-green hover:bg-brand-cream shadow-md"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg"
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
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <span className="inline-block py-1 px-4 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold uppercase tracking-widest mb-4">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-6xl font-display font-extrabold text-brand-brown mb-6 leading-tight">
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-brand-accent rounded-full ${centered ? 'mx-auto' : ''}`} />
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl shadow-xl shadow-brand-dark/5 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);
