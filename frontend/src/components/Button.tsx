import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = memo(({ className = '', type = 'button', onClick, children }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
});

export default Button;
