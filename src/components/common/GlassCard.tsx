"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "motion/react";
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
    "bg-[#082f28e6] border border-[rgba(181,240,229,0.08)] backdrop-blur-[12.5px]",
  dark: "bg-[#02201ee6] border border-[rgba(181,240,229,0.08)] backdrop-blur-[12.5px]",
  light:
    "bg-[#082f28cc] border border-[rgba(181,240,229,0.1)] backdrop-blur-[12.5px]",
  subtle: "border border-lightGreen/10 bg-darkGreen/40 backdrop-blur-xs",
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
