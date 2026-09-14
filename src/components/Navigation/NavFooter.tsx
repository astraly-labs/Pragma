import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const columns = [
  {
    title: "Build",
    links: [
      ["Documentation", "https://docs.pragma.build"],
      ["Data explorer", "/assets"],
      ["Open source", "https://github.com/astraly-labs/pragma-oracle"],
      ["Resources", "/resources"],
    ],
  },
  {
    title: "Network",
    links: [
      ["Ecosystem", "/ecosystem"],
      ["Staking", "/staking"],
      ["Miden integration", "https://github.com/astraly-labs/pragma-miden"],
      [
        "Service status",
        "https://status.production.pragma.build/status/mainnet",
      ],
    ],
  },
  {
    title: "Connect",
    links: [
      ["Contact", "mailto:support@pragma.build"],
      ["Blog", "https://blog.pragma.build"],
      ["X / Twitter", "https://x.com/PragmaOracle"],
      ["Telegram", "https://t.me/+Xri-uUMpWXI3ZmRk"],
    ],
  },
];
export default function NavFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="Pragma home">
            <Image
              src="/brand/pragma-wordmark.svg"
              width={180}
              height={40}
              className="site-logo"
              alt="Pragma"
            />
          </Link>
          <p>
            Real-world data.
            <br />
            Onchain possibilities.
          </p>
          <span className="eyebrow">The oracle for Starknet & Miden</span>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <span className="eyebrow">{column.title}</span>
            {column.links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Pragma Labs</span>
        <div>
          <Link href="/terms">Terms & conditions</Link>
          <Link href="/privacy-policy">Privacy policy</Link>
        </div>
        <span>Built in the open.</span>
      </div>
    </footer>
  );
}
