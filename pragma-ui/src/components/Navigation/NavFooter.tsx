import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/outline";
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
          </nav>
        ))}
        <div className="col-span-4 max-w-md">
          <Link
            href="https://blog.pragma.build/#portal"
            className="flex flex-row pb-3 text-sm tracking-wider text-lightGreen"
          >
            Subscribe to our mailing list{" "}
            <ChevronRightIcon className="my-auto h-6 w-6 pl-2" />
          </Link>
        </div>
      </div>
      <LightGreenUpper className="mt-4 pt-3 text-left md:mt-10 md:pt-10">
        © Pragma Labs - {new Date().getFullYear()}. All rights reserved.
      </LightGreenUpper>
    </div>
  </div>
);

export default Footer;
