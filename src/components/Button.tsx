import { cx } from "class-variance-authority";
import { ComponentPropsWithRef } from "react";

type ButtonProps = {
  label?: string;
  children?: React.ReactNode;
} & ComponentPropsWithRef<"button">;

export const Button = ({
  label,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={cx([
        "w-full p-12 mt-12 rounded-8",
        "bg-gray-400 text-white",
        "transition-colors duration-300",
        "hover:bg-gray-700",
        className,
      ])}
      {...props}
    >
      {children}
      {label}
    </button>
  );
};
