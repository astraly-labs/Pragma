"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "light" | "subtle";
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const variantStyles = {
  default:
    "bg-[linear-gradient(#082f28e6,#082f28e6)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.06)_50%,rgba(255,255,255,0.205)_100%)_border-box] border border-transparent backdrop-blur-[12.5px]",
  dark: "bg-[linear-gradient(#02201ee6,#02201ee6)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.12)_100%)_border-box] border border-transparent backdrop-blur-[12.5px]",
  light:
    "bg-[linear-gradient(#082f28cc,#082f28cc)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.25)_100%)_border-box] border border-transparent backdrop-blur-[12.5px]",
  subtle: "border border-lightGreen/20 bg-darkGreen/40 backdrop-blur-sm",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 md:p-10",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      variant = "default",
      hover = false,
      padding = "md",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-[20px]",
          variantStyles[variant],
          paddingStyles[padding],
          hover &&
            "transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(21,255,129,0.08)]",
          className
        )}
        whileHover={hover ? { scale: 1.01 } : undefined}
        whileTap={hover ? { scale: 0.99 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
