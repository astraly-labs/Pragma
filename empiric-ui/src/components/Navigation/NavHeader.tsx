import React from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import {
  ChatIcon,
  CodeIcon,
  CursorClickIcon,
  MenuIcon,
  PuzzleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";
import NavPopover from "./NavPopover";
import SearchBar from "./SearchBar";
import StyledTransition from "../common/StyledTransition";

interface Resource {
  name: string;
  description: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

// List of resources displayed directly in the nav
const resources: Resource[] = [
  {
    name: "Docs",
    description: "Start using our data by reading our docs.",
    href: "https://docs.empiric.network/quickstart",
    icon: CodeIcon,
  },
  {
    name: "Features",
    description: "Learn about what makes Empiric special.",
    href: "/features",
    icon: PuzzleIcon,
  },
  {
    name: "Publishers",
    description: "Meet our data publishers.",
    href: "/publishers",
    icon: SpeakerphoneIcon,
  },
  {
    name: "Protocols",
    description: "Take a look at who is already using Empiric.",
    href: "/protocols",
    icon: ViewListIcon,
  },
];

// List of resources displayed in the more tab
const additional = [
  {
    name: "About Us",
    description: "Get to know the team behind Empiric.",
    href: "/about",
    icon: UserGroupIcon,
  },
  {
    name: "View on Block Explorer",
    description: "Take a closer look at our Starknet contract.",
    href: "#",
    icon: CursorClickIcon,
  },
];

// Calls to action at the bottom of the more tab.
const callsToAction = [
  {
    name: "Request Asset",
    href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
    icon: ChatIcon,
  },
];

const NavHeader = () => (
  <Popover className="relative bg-slate-50 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10 lg:space-x-0">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <a>
              <span className="sr-only">Empiric</span>
              <img
                className="h-12 w-auto"
                src="/empiric-logo.svg"
                alt="Empiric"
              />
            </a>
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          {/* To open mobile menu */}
          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
          {resources.map((resource) => (
            <a
              href={resource.href}
              key={resource.name}
              className="text-base font-medium text-slate-500 hover:text-slate-900"
            >
              {resource.name}
            </a>
          ))}
          <NavPopover
            buttonName="More"
            content={additional}
            callsToAction={callsToAction}
          />
        </Popover.Group>
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <SearchBar />
        </div>
      </div>
    </div>

    {/* Mobile Version */}
    <StyledTransition
      enterFrom="scale-95"
      enterTo="scale-100"
      leaveFrom="scale-100"
      leaveTo="scale-95"
    >
      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
      >
        <div className="divide-y-2 divide-slate-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="empiric-logo.svg"
                  alt="Empiric"
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {resources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.href}
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50"
                  >
                    <resource.icon
                      className="h-6 w-6 flex-shrink-0 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-slate-900">
                      {resource.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="space-y-6 py-6 px-5">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {additional.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-slate-900 hover:text-slate-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <SearchBar />
              <p className="mt-6 text-center text-base font-medium text-slate-500">
                Need help?{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </StyledTransition>
  </Popover>
);

export default NavHeader;
