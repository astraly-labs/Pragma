import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import {
  // CursorClickIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
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
];

const products = [
  {
    name: "Explorer",
    description: "Explore Pragma's assets and data",
    href: "/assets",
    icon: "/assets/vectors/explorer.svg",
  },
  {
    name: "Optimistic Oracle",
    description: "Pragma's Optimistic Oracle solution",
    href: "/optimistic",
    icon: "/assets/vectors/optimistic.svg",
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
  const [isCommunityPopoverOpen, setIsCommunityPopoverOpen] = useState(false);
  const [isProductsPopoverOpen, setIsProductsPopoverOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsHidden(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div
              onMouseEnter={() => setIsProductsPopoverOpen(true)}
              onMouseLeave={() => setIsProductsPopoverOpen(false)}
            >
              <NavPopover
                buttonName="Products"
                content={products}
                isOpen={isProductsPopoverOpen}
                description="Discover the different interfaces to interact with Pragma."
              />
            </div>
            <div
              onMouseEnter={() => setIsCommunityPopoverOpen(true)}
              onMouseLeave={() => setIsCommunityPopoverOpen(false)}
            >
              <NavPopover
                buttonName="Community"
                content={additional}
                // callsToAction={callsToAction}
                isOpen={isCommunityPopoverOpen}
                description="Join the Pragma community on any of those channels"
              />
            </div>
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
          ref={mobileMenuRef}
          className={classNames(
            styles.mobilePop,
            "absolute inset-x-0 top-0 origin-top-right transform transition md:hidden"
          )}
        >
          <div
            className={classNames(
              "relative m-auto flex h-full flex-col rounded-lg"
            )}
          >
            <div className="px-3 pb-6">
              <div className="flex w-full items-center justify-between">
                <div>
                  <img
                    className="ml-1 h-6 w-auto sm:h-8 md:h-6 lg:h-8"
                    src="/pragma-logo.png"
                    alt="Logo"
                  />
                </div>
                <div>
                  <Popover.Button
                    onClick={() => setIsHidden(false)}
                    className="inline-flex items-center justify-center rounded-full p-1 text-lightGreen"
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mx-auto mt-6 items-center justify-center">
                <nav className="grid items-center justify-center gap-y-8">
                  {[...mobileResources, ...resources].map((resource) => (
                    <Link
                      key={resource.name}
                      href={resource.href}
                      className="-m-3 flex items-center justify-center rounded-md p-3 text-center"
                    >
                      <span className="font-medium text-lightGreen hover:text-white">
                        {resource.name}
                      </span>
                    </Link>
                  ))}

                  {/* Products Popover */}
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="flex items-center justify-center gap-2 rounded-md px-3 text-center text-lightGreen"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    >
                      <span>Products</span>
                      {mobileProductsOpen ? (
                        <ChevronUpIcon className="h-3 w-3" />
                      ) : (
                        <ChevronDownIcon className="h-3 w-3" />
                      )}
                    </button>
                    {mobileProductsOpen && (
                      <div className=" mt-2 space-y-2">
                        {products.map((product) => (
                          <Link
                            key={product.name}
                            href={product.href}
                            className="block items-center justify-center rounded-md p-2 text-center text-sm text-lightGreen hover:text-white"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Community Popover */}
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="flex items-center justify-center gap-2 rounded-md px-3 text-center font-medium text-lightGreen"
                      onClick={() =>
                        setMobileCommunityOpen(!mobileCommunityOpen)
                      }
                    >
                      <span>Community</span>
                      {mobileCommunityOpen ? (
                        <ChevronUpIcon className="h-3 w-3" />
                      ) : (
                        <ChevronDownIcon className="h-3 w-3" />
                      )}
                    </button>
                    {mobileCommunityOpen && (
                      <div className=" mt-2 space-y-2">
                        {additional.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-md p-2 text-center text-sm text-lightGreen hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </div>
            <div className="mx-auto space-y-2 py-6 px-5">
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
