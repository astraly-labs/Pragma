"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StyledTransitionProps {
  show?: boolean;
  enterFrom?: string;
  enterTo?: string;
  leaveFrom?: string;
  leaveTo?: string;
  children: ReactNode;
}

const StyledTransition = ({ show, children }: StyledTransitionProps) => {
  if (!show) return null;
  return <>{children}</>;
};

export default StyledTransition;
