"use client";

import React, { ForwardRefRenderFunction } from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  },
  ref
) => {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${
        isLoading ? styles.loading : ""
      } ${className}`}
      disabled={isDisabled}
      {...(props as any)}
    >
      {isLoading && (
        <span className={styles.spinner} aria-hidden="true">
          <svg
            className={styles.spinnerSvg}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className={styles.spinnerCircle}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className={styles.spinnerPath}
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
      {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </motion.button>
  );
};

export const Button = React.forwardRef(ButtonComponent);
Button.displayName = "Button";
