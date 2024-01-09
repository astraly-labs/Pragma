import React, { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";

const baseStyles = {
  solid:
    "flex  cursor-pointer items-center justify-center  uppercase border md:text-sm lg:tracking-wider hover:bg-transparent focus:outline-none",
  outline:
    "flex  cursor-pointer items-center justify-center rounded-full border uppercase text-sm focus:outline-none",
} as const;
const variantStyles = {
  solid: {
    mint: "rounded-full bg-mint text-darkGreen border-mint hover:text-mint px-5 py-4 lg:px-6 lg:py-4",
    grey: "rounded-md	bg-whiteTrans border-whiteTrans px-6 py-3 text-lightGreen font-light font-sans",
    lightGreen:
      "rounded-full bg-lightGreen text-darkGreen border-lightGreen hover:bg-lightGreen hover:text-darkGreen px-6 py-4",
  },
  outline: {
    mint: "border-mint text-mint hover:bg-mint hover:text-darkGreen px-6 py-4",
    lightGreen:
      "border-lightGreen text-lightGreen hover:bg-lightGreen hover:text-darkGreen py-2 px-4 w-fit",
  },
} as const;

interface GeneralButtonProps {
  variant: keyof typeof baseStyles;
  color: keyof typeof variantStyles["solid"];
  children: ReactNode;
  center: boolean;
  className?: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  href?: string;
}

export const Button: React.FC<
  GeneralButtonProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({
  variant = "solid",
  color = "mint",
  center = false,
  className,
  icon: Icon,
  children,
  ...props
}) => (
  <button
    className={classNames(
      baseStyles[variant],
      variantStyles[variant][color],
      className
    )}
    {...props}
  >
    {Icon && <Icon className="mr-2 h-5 w-5" />}
    {children}
  </button>
);

export const ButtonLink: React.FC<
  GeneralButtonProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({
  variant = "solid",
  color = "dark",
  children,
  href,
  center = false,
  className,
  icon: Icon,
  ...props
}) => (
  // I'm unsure whether we need an external vs internal differentiation
  <Link href={href} className={classNames(center ? "mx-auto" : "")}>
    <div
      className={classNames(
        baseStyles[variant],
        variantStyles[variant][color],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      {children}
    </div>
  </Link>
);
