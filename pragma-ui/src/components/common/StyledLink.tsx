import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import classNames from "classnames";

const linkBaseStyles = (underline: boolean) =>
  classNames("inline text-white hover:text-primary", {
    underline: underline,
  });

interface ExtraLinkProps {
  children: ReactNode;
  underline?: boolean;
}

export const StyledInternalLink: React.FC<
  ExtraLinkProps & React.PropsWithChildren<LinkProps>
> = ({ underline = true, ...props }) => (
  <Link {...props}>
    <div className={linkBaseStyles(underline)}>{props.children}</div>
  </Link>
);

export const StyledExternalLink: React.FC<
  ExtraLinkProps &
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
> = ({ children, underline = true, ...props }) => (
  <a {...props} className={linkBaseStyles(underline)}>
    {children}
  </a>
);
