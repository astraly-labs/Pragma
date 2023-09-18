import React from "react";
import Link from "next/link";
import { StyledExternalLink, StyledInternalLink } from "../common/StyledLink";
import {
  Network,
  buildExplorerUrlForAddress,
} from "../../services/wallet.service";
import { getOracleProxyAddress } from "../../services/address.service";
import { useNetwork } from "../../providers/network";

interface FooterLink {
  title: string;
  href: string;
  external: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const content = (network: Network): FooterColumn[] => [
  {
    heading: "Developers",
    links: [
      {
        title: "Documentation",
        href: "https://docs.pragmaoracle.com/docs/introduction",
        external: true,
      },
      {
        title: "View on Block Explorer",
        href: `${buildExplorerUrlForAddress(
          getOracleProxyAddress(network),
          network
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
        href: "https://drive.google.com/drive/folders/11mE8amIoNa13xeTDI59uyeykPo2iYON9",
        external: true,
      },
      {
        title: "Contact Us",
        href: "mailto:support@pragmaoracle.com?body=Hi%Pragma-Team,",
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
    href: "https://github.com/Astraly-Labs/Pragma",
  },
  {
    name: "Twitter",
    src: "/assets/social/twitter.svg",
    href: "https://twitter.com/PragmaOracle",
  },
  {
    name: "Medium",
    src: "/assets/social/medium.svg",
    href: "https://mirror.xyz/pragmagic.eth",
  },
  {
    name: "Discord",
    src: "/assets/social/discord.svg",
    href: "https://discord.gg/N7sM7VzfJB",
  },
];

const Footer = () => {
  const { network } = useNetwork();
  return (
    <div className="w-full overflow-hidden bg-dark">
      <div className="mx-auto max-w-7xl border-t border-black px-4 pb-12 pt-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-10 lg:gap-20">
          <div className="col-span-2 flex flex-col space-y-8 lg:col-span-4">
            <Link href="/">
              <div className="w-fit">
                <span className="sr-only">Pragma</span>
                <img
                  className="h-12 w-auto sm:h-16 md:h-20"
                  src="/pragma-logo.svg"
                  alt="Pragma"
                />
              </div>
            </Link>
            <p className="prose prose-slate text-grey">
              Pragma is the leading oracle on Starknet, built to empower native
              protocols to realize their ambitious potential.
            </p>
            <ul className="flex flex-row items-center space-x-6">
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href}>
                    <img
                      src={social.src}
                      alt={social.name}
                      className="h-6 w-6 cursor-pointer invert"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {content(network).map((column) => (
            <nav key={column.heading} className="col-span-1 lg:col-span-2">
              <p className="font-semibold uppercase tracking-wider text-grey">
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
        <div className="mt-10 mb-6 w-full border-t border-black pt-10 text-center text-grey md:mb-0">
          © Assert Labs FZCO. - {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
