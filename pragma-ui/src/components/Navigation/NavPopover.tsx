import React, { Fragment } from "react";
import classNames from "classnames";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import StyledTransition from "../common/StyledTransition";

interface PopoverContent {
  name: string;
  description: string;
  href: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

interface CallsToAction {
  name: string;
  href: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

interface NavPopoverProps {
  buttonName: string;
  content: PopoverContent[];
  callsToAction: CallsToAction[];
}

const NavPopover: React.FC<NavPopoverProps> = ({
  buttonName,
  content,
  callsToAction,
}) => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={classNames(
            open ? "text-primary hover:text-white" : "text-grey",
            "group inline-flex items-center rounded-md text-base font-medium hover:text-white focus:outline-none"
          )}
        >
          <span>{buttonName}</span>
          <ChevronDownIcon
            className={classNames(
              open
                ? "stroke-primary group-hover:stroke-primary"
                : "stroke-grey",
              "ml-2 h-5 w-5 group-hover:text-white"
            )}
            aria-hidden="true"
          />
        </Popover.Button>

        <StyledTransition
          enterFrom="translate-y-1"
          enterTo="translate-y-0"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-1"
        >
          <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-white ring-opacity-5">
              <div className="bg-dark relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                {content.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-black"
                  >
                    <item.icon
                      className="text-primary h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="ml-4">
                      <p className="text-base font-medium text-white">
                        {item.name}
                      </p>
                      <p className="text-grey mt-1 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="space-y-6 bg-black px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                {callsToAction.map((item) => (
                  <div key={item.name} className="flow-root">
                    <a
                      href={item.href}
                      className="text-grey hover:bg-dark -m-3 flex items-center rounded-md p-3 text-base font-medium"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-slate-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </StyledTransition>
      </>
    )}
  </Popover>
);

export default NavPopover;
