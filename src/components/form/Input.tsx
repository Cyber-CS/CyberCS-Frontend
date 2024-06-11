import { Slot } from "@radix-ui/react-slot";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  label?: string;
  icon?: React.ReactNode;
  error?: boolean;
  message?: string;
  asChild?: boolean;
};

export const LoginField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon,
      placeholder,
      id,
      error = false,
      message,
      asChild,
      ...props
    }: InputProps,
    ref
  ) => {
    const Comp = asChild ? Slot : "input";
    return (
      <div>
        <fieldset
          className={cx([
            "flex flex-col gap-12 rounded-8",
            "transition-colors duration-300",
            "hover:bg-gray-600",
            {
              "animate-shake": error,
            },
          ])}
        >
          {label && (
            <label className="flex items-center gap-8" htmlFor={id}>
              {icon && icon}
              <span className="text-14/[100%] text-white font-semibold">
                {label}
              </span>
            </label>
          )}
          <Comp
            id={id}
            ref={ref}
            type="text"
            placeholder={placeholder}
            className={cx([
              "bg-gray-500 p-4 rounded-4 text-white outline-none",
              "placeholder:text-gray-50 placeholder:font-medium placeholder:px-4",
              { "border border-red-300 focus-within:border-red-300": error },
            ])}
            {...props}
          />
        </fieldset>
        <span className={cx(["text-12 text-white", { "text-red-300": error }])}>
          {message}
        </span>
      </div>
    );
  }
);

export const SearchField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon,
      placeholder,
      id,
      error = false,
      message,
      asChild,
      ...props
    }: InputProps,
    ref
  ) => {
    const Comp = asChild ? Slot : "input";
    return (
      <div>
        <fieldset
          className={cx([
            "flex gap-24 items-center",
            "transition-colors duration-300",
            {
              "animate-shake": error,
            },
          ])}
        >
          {label && (
            <label className="text-nowrap" htmlFor={id}>
              {icon && icon}
              <span className="text-14/[100%] text-white font-semibold">
                {label}
              </span>
            </label>
          )}
          <Comp
            id={id}
            ref={ref}
            type="text"
            placeholder={placeholder}
            className={cx([
              "w-full p-12 rounded-8 bg-gray-500 placeholder:text-gray-50 outline-none",
              { "border border-red-300 focus-within:border-red-300": error },
            ])}
            {...props}
          />
        </fieldset>
        <span className={cx(["text-12 text-white", { "text-red-300": error }])}>
          {message}
        </span>
      </div>
    );
  }
);
