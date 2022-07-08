import React, { Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

interface StyledTransitionProps {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  children: ReactNode;
}

const StyledTransition: React.FC<StyledTransitionProps> = ({
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  children,
}) => (
  <Transition
    as={Fragment}
    enter={classNames("transition duration-200 ease-out", enter)}
    enterFrom={classNames("opacity-0", enterFrom)}
    enterTo={classNames("opacity-100", enterTo)}
    leave={classNames("transition duration-100 ease-in", leave)}
    leaveFrom={classNames("opacity-100", leaveFrom)}
    leaveTo={classNames("opacity-0", leaveTo)}
  >
    {children}
  </Transition>
);

export default StyledTransition;
