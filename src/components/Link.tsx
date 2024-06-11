import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import { Link as Anchor, LinkProps as AnchorProps } from "react-router-dom";

export const Link = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, ...props }, ref) => (
    <Anchor
      ref={ref}
      className={cx([
        "flex items-center gap-12",
        "transition-colors duration-300",
        className,
      ])}
      {...props}
    />
  )
);
