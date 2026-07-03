import React, { ForwardRefRenderFunction } from "react";
import styles from "./Select.module.css";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

const SelectComponent: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { label, options, error, helperText, className = "", id, ...props },
  ref
) => {
  const selectId = id || `select-${label ? label.replace(/\s+/g, "-").toLowerCase() : Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.container} ${error ? styles.hasError : ""} ${className}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          ref={ref}
          id={selectId}
          className={`${styles.select} ${error ? styles.selectError : ""}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} aria-hidden="true">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export const Select = React.forwardRef(SelectComponent);
Select.displayName = "Select";
