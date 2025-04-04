import React, { Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface StyledTransitionProps {
  show?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  children: ReactNode;
}

const StyledTransition = ({
  show,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  children,
}: StyledTransitionProps) => (
  <Transition
    as={Fragment}
    show={show}
    enter={cn("transition duration-50 ease-out", enter)}
    enterFrom={cn("opacity-50", enterFrom)}
    enterTo={cn("opacity-100", enterTo)}
    leave={cn("transition duration-100 ease-in", leave)}
    leaveFrom={cn("opacity-100", leaveFrom)}
    leaveTo={cn("opacity-0", leaveTo)}
  >
    {children}
  </Transition>
);

export default StyledTransition;
