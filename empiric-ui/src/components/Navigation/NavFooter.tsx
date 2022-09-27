import React from "react";
import Link from "next/link";
import { StyledExternalLink, StyledInternalLink } from "../common/StyledLink";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../../services/wallet.service";
import { getOracleControllerAddress } from "../../services/address.service";

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
        href: "https://docs.empiric.network/quickstart",
        external: true,
      },
      {
        title: "View on Block Explorer",
        href: `${buildExplorerUrlForAddress(
          getOracleControllerAddress(networkId())
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
        title: "Features",
        href: "/features",
        external: false,
      },
      {
        title: "Publishers",
        href: "/publishers",
        external: false,
      },
      {
        title: "Protocols",
        href: "/protocols",
        external: false,
      },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        title: "About Us",
        href: "/about",
        external: false,
      },
      {
        title: "Blog",
        href: "https://medium.com/@EmpiricNetwork",
        external: true,
      },
      {
        title: "Press Kit",
        href: "https://drive.google.com/drive/folders/11mE8amIoNa13xeTDI59uyeykPo2iYON9",
        external: true,
      },
      {
        title: "Contact Us",
        href: "mailto:hello@42labs.xyz?body=Hi%20Empiric-Team,",
        external: true,
      },
    ],
  },
];

export interface SocialMedia {
  name: string;
  src: string;
  href: string;
}

const socials: SocialMedia[] = [
  {
    name: "GitHub",
    src: "/assets/social/github.svg",
    href: "https://github.com/42labs/Empiric",
  },
  {
    name: "Twitter",
    src: "/assets/social/twitter.svg",
    href: "https://twitter.com/EmpiricNetwork",
  },
  {
    name: "Medium",
    src: "/assets/social/medium.svg",
    href: "https://medium.com/@EmpiricNetwork",
  },
];

const Footer = () => (
  <div className="w-full bg-white">
    <div className="mx-auto max-w-7xl border-t border-slate-100 px-4 pb-12 pt-16 lg:px-8">
      <div className="grid grid-cols-2 gap-10 lg:grid-cols-10 lg:gap-20">
        <div className="col-span-2 flex flex-col space-y-8 lg:col-span-4">
          <Link href="/">
            <a className="w-fit">
              <span className="sr-only">Empiric</span>
              <img
                className="h-12 w-auto sm:h-16 md:h-20"
                src="/empiric-logo.svg"
                alt="Empiric"
              />
            </a>
          </Link>
          <p className="prose prose-slate">
            Empiric is the leading oracle on Starknet, built to empower native
            protocols to realize their ambitious potential.
          </p>
          <ul className="flex flex-row items-center space-x-6">
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.href}>
                  <img
                    src={social.src}
                    alt={social.name}
                    className="h-6 w-6 cursor-pointer"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {content.map((column) => (
          <nav key={column.heading} className="col-span-1 lg:col-span-2">
            <p className="font-semibold uppercase tracking-wider text-slate-500">
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
      </div>
      <div className="mt-10 mb-6 w-full border-t border-slate-100 pt-10 text-center text-slate-600 md:mb-0">
        © 42 Labs Inc. - {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  </div>
);

export default Footer;
