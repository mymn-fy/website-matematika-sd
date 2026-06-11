import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', href, ...props }, ref) => {
    // Tambahkan inline-block text-center agar elemen <a> berperilaku rapi seperti button
    const baseStyles = 'inline-block text-center font-poppins font-semibold rounded-2xl transition-all duration-300 hover:shadow-soft-lg';
    
    const variants = {
      primary: 'bg-sky-blue text-white hover:bg-blue-400',
      secondary: 'bg-soft-yellow text-gray-800 hover:bg-yellow-300',
      success: 'bg-mint-green text-gray-800 hover:bg-green-400',
      warning: 'bg-peach text-white hover:bg-orange-400',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
