"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ChevronRight, Activity } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import {
  StyledExternalLink,
  StyledInternalLink,
} from "@/components/common/StyledLink";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../../services/wallet.service";
import { getOracleProxyAddress } from "../../services/address.service";
import LightGreenUpper from "@/components/common/LightGreenUpperText";
import styles from "./styles.module.scss";

interface FooterLink {
  title: string;
  href: string;
  external: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const content: FooterColumn[] = [
  {
    heading: "Developers",
    links: [
      {
        title: "Documentation",
        href: "https://docs.pragma.build",
        external: true,
      },
      {
        title: "View on Block Explorer",
        href: `${buildExplorerUrlForAddress(
          getOracleProxyAddress(networkId())
        )}#readContract`,
        external: true,
      },
    ],
  },
  {
    heading: "Product",
    links: [
      {
        title: "Home",
        href: "/",
        external: false,
      },
      {
        title: "Explorer",
        href: "/assets",
        external: false,
      },
      {
        title: "Ecosystem",
        href: "/ecosystem",
        external: false,
      },
      {
        title: "Resources",
        href: "/resources",
        external: false,
      },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        title: "Blog",
        href: "https://blog.pragma.build/",
        external: true,
      },
      {
        title: "Press Kit",
        href: "https://buildonpragma.notion.site/Pragma-brand-kit-7a0505dd53874274819309d9a1f6ed3c?pvs=4",
        external: true,
      },
      {
        title: "Contact Us",
        href: "mailto:support@pragma.build?body=Hi%Pragma-Team,",
        external: true,
      },
      {
        title: "Terms and Conditions",
        href: "/terms",
        external: false,
      },
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
        external: false,
      },
    ],
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <div className="mt-20 w-full overflow-hidden bg-greenFooter">
      <div
        className={clsx(
          "3xl:px-0 mx-auto px-4 pb-12 pt-16 md:mx-auto md:w-11/12 md:px-10 2xl:px-24",
          styles.bigScreen
        )}
      >
        <div className="pb-20">
          <Link href="/">
            <div className="w-fit">
              <span className="sr-only">Pragma</span>
              <Image
                height={40}
                width={150}
                className="h-8 w-auto sm:h-10 md:h-10"
                src="/pragma-logo.png"
                alt="Logo"
              />
            </div>
          </Link>
          <p className="lg:5/12 prose-slate w-full pt-5 text-lightGreen sm:w-10/12 md:w-7/12">
            Pragma is the leading oracle on Starknet, built to empower native
            protocols to realize their ambitious potential.
          </p>
        </div>
        <motion.div
          ref={footerRef}
          className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-10 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {content.map((column) => (
            <motion.nav
              key={column.heading}
              className="col-span-3 md:col-span-1 lg:col-span-2"
              variants={staggerItem}
            >
              <p className="text-xs uppercase tracking-wider text-LightGreenFooter">
                {column.heading}
              </p>
              <div className="mt-6 flex flex-col space-y-4">
                {column.links.map(({ external, title, href }) => (
                  <Fragment key={title}>
                    {external ? (
                      <StyledExternalLink href={href} underline={false}>
                        {title}
                      </StyledExternalLink>
                    ) : (
                      <StyledInternalLink href={href} underline={false}>
                        {title}
                      </StyledInternalLink>
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.nav>
          ))}
          <motion.div
            className="col-span-4 flex max-w-md flex-col gap-4"
            variants={staggerItem}
          >
            <Link
              href="https://blog.pragma.build/#portal"
              className="flex flex-row pb-3 text-sm tracking-wider text-lightGreen"
            >
              Subscribe to our mailing list{" "}
              <ChevronRight className="my-auto h-6 w-6 pl-2" />
            </Link>
            <Link
              href="https://status.production.pragma.build/status/mainnet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm tracking-wider text-lightGreen transition-colors hover:text-mint"
            >
              <Activity className="h-4 w-4 text-mint" />
              API Status
            </Link>
          </motion.div>
        </motion.div>
        <LightGreenUpper className="mt-4 pt-3 text-left md:mt-10 md:pt-10">
          © Pragma Labs - {new Date().getFullYear()}. All rights reserved.
        </LightGreenUpper>
      </div>
    </div>
  );
};

export default Footer;
