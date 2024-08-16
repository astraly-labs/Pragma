import React from "react";
import Link from "next/link";
import { StyledExternalLink, StyledInternalLink } from "../common/StyledLink";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../../services/wallet.service";
import { getOracleProxyAddress } from "../../services/address.service";
import InputComponent from "./EmailInput";
import LightGreenUpper from "../common/LightGreenUpperText";
import classNames from "classnames";
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
      // {
      //   title: "About Us",
      //   href: "/about",
      //   external: false,
      // },
      {
        title: "Blog",
        href: "https://mirror.xyz/pragmagic.eth",
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
        href: "/privacyPolicy",
        external: false,
      },
    ],
  },
];

export interface SocialMedia {
  name: string;
  src: string;
  href: string;
}

// const socials: SocialMedia[] = [
//   {
//     name: "GitHub",
//     src: "/assets/social/github.svg",
//     href: "https://github.com/Astraly-Labs/Pragma",
//   },
//   {
//     name: "Twitter",
//     src: "/assets/social/twitter.svg",
//     href: "https://twitter.com/PragmaOracle",
//   },
//   {
//     name: "Medium",
//     src: "/assets/social/medium.svg",
//     href: "https://mirror.xyz/pragmagic.eth",
//   },
//   {
//     name: "Discord",
//     src: "/assets/social/discord.svg",
//     href: "https://discord.gg/N7sM7VzfJB",
//   },
// ];

const Footer = () => (
  <div className="mt-20 w-full overflow-hidden bg-greenFooter">
    <div
      className={classNames(
        "3xl:px-0 mx-auto px-4 pb-12 pt-16 md:mx-auto md:w-11/12 md:px-10 2xl:px-24",
        styles.bigScreen
      )}
    >
      <div className="pb-20">
        <Link href="/">
          <div className="w-fit">
            <span className="sr-only">Pragma</span>
            <img
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
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-10 lg:gap-10">
        {content.map((column) => (
          <nav
            key={column.heading}
            className="col-span-3 md:col-span-1 lg:col-span-2"
          >
            <p className="text-xs uppercase	 tracking-wider text-LightGreenFooter">
              {column.heading}
            </p>
            <div className="mt-6 flex flex-col space-y-4">
              {column.links.map(({ external, title, href }) => (
                <React.Fragment key={title}>
                  {external ? (
                    <StyledExternalLink href={href} underline={false}>
                      {title}
                    </StyledExternalLink>
                  ) : (
                    <StyledInternalLink href={href} underline={false}>
                      {title}
                    </StyledInternalLink>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        ))}
        <div className="col-span-4 max-w-md">
          <div className="pb-3 text-lg text-lightGreen">
            Subscribe to our mailing list
          </div>
          <InputComponent placeholderText="Email address" />
        </div>
      </div>
      <LightGreenUpper className="mt-4 pt-3 text-left md:mt-10 md:pt-10">
        © Pragma Labs - {new Date().getFullYear()}. All rights reserved.
      </LightGreenUpper>
    </div>
  </div>
);

export default Footer;
