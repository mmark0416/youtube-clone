import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Proptype from "prop-types";

export const buttonStyle = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function Button({ variant, size, className, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyle({ variant, size }), className)}
    />
  );
}

Button.propTypes = {
  variant: Proptype.oneOf(["default", "ghost", "dark"]),
  size: Proptype.oneOf(["default", "icon"]),
  className: Proptype.string,
};
