import React from "react";
import Link from "next/link";
import { StyledExternalLink, StyledInternalLink } from "../common/StyledLink";

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
        href: "#",
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
        href: "#",
        external: false,
      },
      {
        title: "Press Kit",
        href: "#",
        external: true,
      },
      {
        title: "Contact Us",
        href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
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
    href: "https://github.com/42labs/Pontis",
  },
  {
    name: "Twitter",
    src: "/assets/social/twitter.svg",
    href: "#",
  },
];

const Footer = () => (
  <div className="w-full bg-white">
    <div className="mx-auto max-w-7xl border-t border-slate-100 px-4 pb-12 pt-16 lg:px-8">
      <div className="grid grid-cols-2 gap-10 lg:grid-cols-10 lg:gap-20">
        <div className="col-span-2 flex flex-col space-y-8 lg:col-span-4">
          <Link href="/">
            <a>
              <span className="sr-only">Pontis</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/pontis-logo.svg"
                alt="Pontis"
              />
            </a>
          </Link>
          <p className="prose prose-slate">
            Pontis is the leading oracle on Starknet, built to empower native
            protocols to realize their ambitious potential.
          </p>
          <ul className="flex flex-row items-center space-x-6">
            {socials.map((social) => (
              <li key={social.name}>
                <img
                  src={social.src}
                  alt={social.name}
                  className="h-6 w-6 cursor-pointer"
                />
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
                    <StyledExternalLink href={href}>{title}</StyledExternalLink>
                  ) : (
                    <StyledInternalLink href={href}>{title}</StyledInternalLink>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        ))}
      </div>
      <div className="mt-10 mb-6 w-full border-t border-slate-100 pt-10 text-center text-slate-600 md:mb-0">
        © 42 Labs - {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  </div>
);

export default Footer;
