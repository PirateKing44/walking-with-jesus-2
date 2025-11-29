import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 font-display font-medium tracking-wider transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden rounded-sm";
  
  const variants = {
    primary: "bg-stone-900 text-mystic-gold hover:bg-stone-800 shadow-lg shadow-stone-900/10 hover:shadow-stone-900/20 border border-stone-800",
    secondary: "bg-white text-stone-800 border border-stone-200 hover:border-mystic-gold hover:text-mystic-goldDark shadow-md hover:shadow-lg",
    outline: "bg-transparent text-stone-600 border border-stone-300 hover:border-mystic-gold hover:text-mystic-goldDark hover:bg-white/50"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Subtle shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
    </button>
  );
};