import React from "react";
import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "glass";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly isIcon?: boolean;
  readonly fullWidth?: boolean;
  readonly children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  isIcon = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const classNames = [
    styles.btn,
    styles[`btn--${variant}`],
    size !== "md" ? styles[`btn--${size}`] : "",
    isLoading ? styles["btn--loading"] : "",
    isIcon ? styles["btn--icon"] : "",
    fullWidth ? styles["btn--full"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classNames}
      disabled={disabled ?? isLoading}
      {...props}
    >
      {isLoading && <span className={styles.btn__spinner} />}
      {children}
    </button>
  );
}
