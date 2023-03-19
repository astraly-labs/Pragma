import React, { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";

const baseStyles = {
  solid:
    "flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-base shadow-lg hover:shadow-xl md:px-6 md:py-4 md:text-xl focus:outline-none",
  outline:
    "flex cursor-pointer items-center justify-center rounded-lg border-2 px-[calc(theme(spacing.4)-2px)] py-[calc(theme(spacing.3)-2px)] text-base md:px-[calc(theme(spacing.6)-1px)] md:py-[calc(theme(spacing.4)-1px)] md:text-xl focus:outline-none",
} as const;

const variantStyles = {
  solid: {
    dark: "bg-dark text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-slate-900",
    slate:
      "bg-black text-slate-900 hover:bg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 active:bg-slate-400 active:text-slate-900/90 disabled:opacity-30 disabled:hover:bg-slate-900",
    indigo:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-indigo-600",
    white:
      "bg-white text-secondary hover:text-primary hover:bg-slate-50 focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-secondary active:text-white disabled:opacity-40 disabled:hover:text-indigo-600",
  },
  outline: {
    dark: "border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 active:border-slate-200 active:bg-slate-50 active:text-slate-900/70 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent",
    slate:
      "border-grey text-grey hover:border-slate-300 hover:bg-dark focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-slate-300 active:border-primary active:text-slate-900/70 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent",
    indigo:
      "border-indigo-300 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:text-indigo-600/70 disabled:opacity-40 disabled:hover:border-indigo-300 disabled:hover:bg-transparent",
    white:
      "border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 active:border-slate-200 active:bg-slate-50 active:text-slate-900/70 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent",
  },
} as const;

interface GeneralButtonProps {
  variant: keyof typeof baseStyles;
  color: keyof typeof variantStyles["solid"];
  children: ReactNode;
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
  color = "dark",
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
  className,
  icon: Icon,
  ...props
}) => (
  // I'm unsure whether we need an external vs internal differentiation
  <Link href={href}>
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
