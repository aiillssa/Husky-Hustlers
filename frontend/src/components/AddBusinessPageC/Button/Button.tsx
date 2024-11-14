import React from 'react';
import type { FC } from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  className: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ className, type = 'button', onClick, children }) => {
  return (
    <button className={`${classes.root} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
