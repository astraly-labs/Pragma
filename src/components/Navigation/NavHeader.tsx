"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["Explorer", "/assets"],
  ["Ecosystem", "/ecosystem"],
  ["Resources", "/resources"],
  ["Updates", "/updates"],
  ["Staking", "/staking"],
];
export default function NavHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-header-inner">
        <Link href="/" aria-label="Pragma home" onClick={() => setOpen(false)}>
          <Image
            src="/brand/pragma-wordmark.svg"
            width={180}
            height={40}
            className="site-logo"
            alt="Pragma"
            priority
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              aria-current={
                pathname === href || pathname?.startsWith(`${href}/`)
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <a
          className="site-button small header-cta"
          href="https://docs.pragma.build"
        >
          Start building <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ["Home", "/"],
            ...links,
            ["Documentation", "https://docs.pragma.build"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={
                pathname === href || pathname?.startsWith(`${href}/`)
                  ? "page"
                  : undefined
              }
            >
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
