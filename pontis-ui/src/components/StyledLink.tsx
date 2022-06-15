import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

const LinkStyleWrapper = ({ children }: { children: ReactNode }) => (
  <div className="inline text-blue-700 underline hover:text-blue-400 cursor-pointer">
    {children}
  </div>
);

export const StyledInternalLink = (
  props: React.PropsWithChildren<LinkProps>
) => (
  <LinkStyleWrapper>
    <Link {...props}></Link>
  </LinkStyleWrapper>
);

export const StyledExternalLink = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => (
  <LinkStyleWrapper>
    <a {...props}></a>
  </LinkStyleWrapper>
);
