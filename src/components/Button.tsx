import { cx } from "class-variance-authority";
import { ComponentPropsWithRef } from "react";

type ButtonProps = {
  label: string;
} & ComponentPropsWithRef<"button">;

export const Button = ({ label, className, ...props }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={cx([
        "bg-gray-700 w-full p-12 mt-12 text-white rounded-8",
        "transition-colors duration-300",
        className,
      ])}
      {...props}
    >
      {label}
    </button>
  );
};
