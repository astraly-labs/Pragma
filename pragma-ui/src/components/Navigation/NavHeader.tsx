import React, { useState } from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import {
  // CursorClickIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
// import {
//   buildExplorerUrlForAddress,
//   networkId,
// } from "../../services/wallet.service";
// import { getOracleProxyAddress } from "../../services/address.service";
import styles from "./styles.module.scss";
import { ButtonLink } from "../common/Button";
import classNames from "classnames";
import NavPopover from "./NavPopover";
import Image from "next/image";

interface Resource {
  name: string;
  href: string;
}

// List of resources displayed directly in the nav
const resources: Resource[] = [
  {
    name: "Ecosystem",
    href: "/ecosystem",
  },
  {
    name: "Docs",
    href: "https://docs.pragma.build",
  },
  {
    name: "Resources",
    href: "/resources",
  },
  {
    name: "Explorer",
    href: "/assets",
  },
];

const additional = [
  {
    name: "Twitter",
    description: "",
    href: "https://twitter.com/PragmaOracle",
    icon: "/assets/social/twitter.svg",
  },
  {
    name: "Farcaster",
    description: "",
    href: "https://warpcast.com/pragmaoracle",
    icon: "/assets/social/farcaster.svg",
  },
  {
    name: "Discord",
    description: "",
    href: "https://discord.gg/M9aRZtZHU7",
    icon: "/assets/social/discord.svg",
  },
  {
    name: "Telegram",
    description: "",
    href: "https://t.me/+Xri-uUMpWXI3ZmRk",
    icon: "/assets/social/telegram.svg",
  },
  {
    name: "GitHub",
    description: "",
    href: "https://github.com/Astraly-Labs/Pragma",
    icon: "/assets/social/github.svg",
  },
  {
    name: "Blog",
    description: "",
    href: "https://blog.pragma.build/",
    icon: "/assets/social/medium.svg",
  },
  // {
  //   name: "View on Block Explorer",
  //   description: "Take a closer look at our Starknet contract.",
  //   href: `${buildExplorerUrlForAddress(
  //     getOracleProxyAddress(networkId())
  //   )}#readContract`,
  //   icon: CursorClickIcon,
  // },
];

// const callsToAction = [];

// Mobile only
const mobileResources = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
];

const NavHeader = () => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <Popover
      className={classNames(styles.bigScreen, "absolute w-full py-8 px-3")}
    >
      <div
        className={classNames(
          styles.container,
          isHidden ? "border-0 px-0 py-0" : "block",
          "md:mx-auto md:w-11/12"
        )}
      >
        <div
          className={classNames(
            " items-center justify-between md:space-x-5 lg:space-x-0",
            isHidden ? "hidden" : "flex"
          )}
        >
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div>
                <span className="sr-only">Pragma</span>
                <img
                  className="h-6 w-auto sm:h-8 md:h-6 lg:h-8"
                  src="/pragma-logo.png"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            {/* To open mobile menu */}
            <Popover.Button
              onClick={() => setIsHidden(true)}
              className="hover:bg-dark inline-flex items-center justify-center rounded-md p-2 text-lightGreen"
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex md:space-x-4 lg:space-x-10"
          >
            {resources.map((resource) => (
              <Link
                href={resource.href}
                key={resource.name}
                className="text-base font-medium text-lightGreen transition-colors duration-300 hover:text-white"
              >
                {resource.name}
              </Link>
            ))}
            <NavPopover
              buttonName="Community"
              content={additional}
              // callsToAction={callsToAction}
            />
          </Popover.Group>
          <div className="hidden w-4 md:flex lg:hidden"></div>
          <div className="hidden items-center justify-end lg:flex lg:w-0 lg:flex-1">
            <ButtonLink
              center={false}
              variant="solid"
              color="mint"
              href="https://docs.pragma.build"
            >
              Start building
            </ButtonLink>
          </div>
        </div>

        {/* Mobile Version */}
        <Popover.Panel
          focus
          className={classNames(
            styles.mobilePop,
            "absolute inset-x-0 top-0 origin-top-right transform transition md:hidden"
          )}
        >
          <div
            className={classNames(
              "relative m-auto flex h-full flex-col justify-center rounded-lg"
            )}
          >
            <div className="px-5 pb-6">
              <div className="absolute top-2 left-4 flex w-full items-center justify-between">
                <div>
                  <Image
                    className="h-6 w-auto sm:h-8 md:h-6 lg:h-8"
                    src="pragma-logo.png"
                    alt="Logo"
                  />
                </div>
                <div className="my-auto mr-7">
                  <Popover.Button
                    onClick={() => setIsHidden(false)}
                    className="inline-flex items-center justify-center rounded-full p-1 text-lightGreen"
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {[...mobileResources, ...resources].map((resource) => (
                    <Link
                      key={resource.name}
                      href={resource.href}
                      className="-m-3 flex items-center rounded-md p-3 text-center"
                    >
                      <span className=" mx-auto font-medium text-lightGreen hover:text-white">
                        {resource.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mx-auto space-y-2 py-6 px-5">
              {/* {additional.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mx-auto text-base font-medium text-lightGreen"
                >
                  {item.name}
                </a>
              ))} */}
              <ButtonLink
                variant="solid"
                color="mint"
                center={true}
                href="https://docs.pragma.build"
              >
                Start Building
              </ButtonLink>
            </div>
          </div>
        </Popover.Panel>
      </div>
    </Popover>
  );
};

export default NavHeader;
