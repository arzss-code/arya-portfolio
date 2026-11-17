import { ButtonHTMLAttributes, ReactNode } from "react";

import cn from "@/common/libs/clsxm";

export type ButtonVariant =
  | "primary"
  | "obsidian"
  | "secondary"
  | "success"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "rounded" | "pill";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-tactile btn-tactile-primary",
  obsidian: "btn-tactile btn-tactile-obsidian",
  secondary: "btn-tactile btn-tactile-secondary",
  success: "btn-tactile btn-tactile-success",
  ghost:
    "inline-flex items-center justify-center gap-2 font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-neutral-200 dark:hover:bg-neutral-800",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-12 px-7 py-3 text-base",
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  rounded: "rounded-[10px]",
  pill: "rounded-full",
};

export const getButtonClasses = ({
  variant = "primary",
  size = "md",
  shape = "rounded",
  className = "",
}: ButtonStyleOptions = {}): string => {
  return cn(
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    SHAPE_CLASSES[shape],
    className,
  );
};

const Button = ({
  children,
  isLoading = false,
  className = "",
  icon,
  variant = "primary",
  size = "md",
  shape = "rounded",
  type = "button",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={getButtonClasses({ variant, size, shape, className })}
      {...rest}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {icon ? <span className="shrink-0">{icon}</span> : null}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
