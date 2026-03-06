"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Home, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
// import {
//   buildExplorerUrlForAddress,
//   networkId,
// } from "../../services/wallet.service";
// import { getOracleProxyAddress } from "../../services/address.service";
import styles from "./styles.module.scss";
import { ButtonLink } from "../common/Button";
import clsx from "clsx";
import NavPopover from "./NavPopover";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
];

const additional = [
  {
    name: "Twitter",
    description: "",
    href: "https://twitter.com/PragmaOracle",
    icon: "/assets/social/twitter.svg",
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
    icon: Home,
  },
];

const NavHeader = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [isCommunityPopoverOpen, setIsCommunityPopoverOpen] = useState(false);
  const [isProductsPopoverOpen, setIsProductsPopoverOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);

  return (
    <div
      className={clsx(
        styles.bigScreen,
        "fixed top-0 left-0 right-0 z-40 w-full py-4 px-3 transition-all duration-300"
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-darkGreen/80 backdrop-blur-md"
        style={{ opacity: headerBgOpacity }}
      />
      <div
        className={clsx(
          styles.container,
          "relative z-10 md:mx-auto md:w-11/12 block",
          mobileMenuOpen && "border-0 p-0"
        )}
      >
        <div
          className={clsx(
            "items-center justify-between md:space-x-5 lg:space-x-0 flex",
            mobileMenuOpen && "opacity-0"
          )}
        >
          <div className="flex justify-start lg:w-0 lg:flex-1 ">
            <Link href="/">
              <div>
                <span className="sr-only">Pragma</span>
                <Image
                  height={40}
                  width={150}
                  className="h-6 w-auto sm:h-8 md:h-6 lg:h-8"
                  src="/pragma-logo.png"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="hover:bg-dark inline-flex items-center justify-center rounded-md p-2 text-lightGreen"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="hidden md:flex md:space-x-4 lg:space-x-10">
            {resources.map((resource) => (
              <Link
                href={resource.href}
                key={resource.name}
                className={`${
                  resource.name === "Pragma v2" ? "text-bold text-purple" : ""
                } text-base font-medium text-lightGreen transition-colors duration-300 hover:text-white`}
                style={
                  resource.name === "Pragma v2"
                    ? {
                        textShadow:
                          "0px 0px 67px rgba(137, 44, 255, 1), 0px 0px 14px rgba(255, 255, 255, 0.25)",
                      }
                    : {}
                }
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
                isOpen={isCommunityPopoverOpen}
                description="Join the Pragma community on any of those channels"
              />
            </div>
          </nav>
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

        {/* Mobile Menu - rendered via portal to escape stacking contexts */}
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 flex flex-col bg-[#042420] md:hidden"
                  style={{ zIndex: 99999 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5">
                    <Image
                      height={40}
                      width={150}
                      className="h-6 w-auto"
                      src="/pragma-logo.png"
                      alt="Logo"
                    />
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-full p-2 text-lightGreen transition-colors hover:bg-lightBlur"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Nav links */}
                  <motion.nav
                    className="flex flex-1 flex-col items-center justify-center gap-1 px-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {[...mobileResources, ...resources].map((resource) => (
                      <motion.div key={resource.name} variants={staggerItem}>
                        <Link
                          href={resource.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-6 py-3 text-center text-xl font-light text-lightGreen transition-colors hover:bg-lightBlur/30 hover:text-white"
                        >
                          {resource.name}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Products */}
                    <motion.div
                      className="flex w-full flex-col items-center"
                      variants={staggerItem}
                    >
                      <button
                        className="flex items-center gap-2 rounded-xl px-6 py-3 text-xl font-light text-lightGreen transition-colors hover:bg-lightBlur/30"
                        onClick={() =>
                          setMobileProductsOpen(!mobileProductsOpen)
                        }
                      >
                        Products
                        <motion.div
                          animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            className="overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {products.map((product) => (
                              <Link
                                key={product.name}
                                href={product.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-lg px-6 py-2.5 text-center text-base text-lightGreen/70 transition-colors hover:text-mint"
                              >
                                {product.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Community */}
                    <motion.div
                      className="flex w-full flex-col items-center"
                      variants={staggerItem}
                    >
                      <button
                        className="flex items-center gap-2 rounded-xl px-6 py-3 text-xl font-light text-lightGreen transition-colors hover:bg-lightBlur/30"
                        onClick={() =>
                          setMobileCommunityOpen(!mobileCommunityOpen)
                        }
                      >
                        Community
                        <motion.div
                          animate={{ rotate: mobileCommunityOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileCommunityOpen && (
                          <motion.div
                            className="overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {additional.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-lg px-6 py-2.5 text-center text-base text-lightGreen/70 transition-colors hover:text-mint"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.nav>

                  {/* CTA at bottom */}
                  <motion.div
                    className="px-6 pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ButtonLink
                      variant="solid"
                      color="mint"
                      center={true}
                      href="https://docs.pragma.build"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      Start Building
                    </ButtonLink>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    </div>
  );
};

export default NavHeader;
