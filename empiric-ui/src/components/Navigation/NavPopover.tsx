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
            open ? "text-indigo-600 hover:text-indigo-400" : "text-slate-500",
            "group inline-flex items-center rounded-md bg-slate-50 text-base font-medium hover:text-slate-900 focus:outline-none"
          )}
        >
          <span>{buttonName}</span>
          <ChevronDownIcon
            className={classNames(
              open
                ? "stroke-indigo-600 group-hover:stroke-indigo-400"
                : "stroke-slate-400",
              "ml-2 h-5 w-5 group-hover:text-slate-500"
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
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                {content.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-slate-50"
                  >
                    <item.icon
                      className="h-6 w-6 flex-shrink-0 text-indigo-600"
                      aria-hidden="true"
                    />
                    <div className="ml-4">
                      <p className="text-base font-medium text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="space-y-6 bg-slate-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                {callsToAction.map((item) => (
                  <div key={item.name} className="flow-root">
                    <a
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-slate-900 hover:bg-slate-100"
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
