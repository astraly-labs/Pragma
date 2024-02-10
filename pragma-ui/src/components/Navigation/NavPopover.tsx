import React, { Fragment } from "react";
import classNames from "classnames";
import { Popover } from "@headlessui/react";
import StyledTransition from "../common/StyledTransition";
import styles from "./styles.module.scss";

interface PopoverContent {
  name: string;
  description: string;
  href: string;
  icon: string;
}

// interface CallsToAction {
//   name: string;
//   href: string;
// }

interface NavPopoverProps {
  buttonName: string;
  content: PopoverContent[];
}

const NavPopover: React.FC<NavPopoverProps> = ({
  buttonName,
  content,
  // callsToAction,
}) => (
  <Popover className="relative text-lightGreen">
    {({ open }) => (
      <>
        <Popover.Button
          className={classNames(
            open ? "text-lightGreen hover:text-white" : "text-grey",
            "group inline-flex items-center rounded-md text-base font-medium hover:text-white focus:outline-none"
          )}
        >
          <span>{buttonName}</span>
        </Popover.Button>

        <StyledTransition
          enterFrom="translate-y-1"
          enterTo="translate-y-0"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-1"
        >
          <Popover.Panel className="absolute -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
            <div
              className={classNames(
                "border-1 overflow-hidden	rounded-2xl bg-lightBlur shadow-lg ring-1 ring-white ring-opacity-5",
                styles.popoverPanel
              )}
            >
              <div className="bg-dark relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                {content.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 flex items-start rounded-lg p-3 hover:opacity-50"
                  >
                    <img
                      className="my-auto h-4 w-4 text-lightGreen"
                      src={item.icon}
                      alt={"logo"}
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
              {/* <div className="space-y-6 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                {callsToAction.map((item) => (
                  <div key={item.name} className="flow-root">
                    <a
                      href={item.href}
                      className="text-grey hover:bg-dark -m-3 flex items-center rounded-md p-3 text-base font-medium"
                    >
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </div>
                ))}
              </div> */}
            </div>
          </Popover.Panel>
        </StyledTransition>
      </>
    )}
  </Popover>
);

export default NavPopover;
