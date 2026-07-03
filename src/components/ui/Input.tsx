import React, { ForwardRefRenderFunction } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, helperText, className = "", id, ...props },
  ref
) => {
  const inputId = id || `input-${label ? label.replace(/\s+/g, "-").toLowerCase() : Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.container} ${error ? styles.hasError : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export const Input = React.forwardRef(InputComponent);
Input.displayName = "Input";
