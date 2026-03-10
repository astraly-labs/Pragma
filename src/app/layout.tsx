import { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.css";
import { Providers } from "@/lib/providers";
import NavHeader from "@/components/Navigation/NavHeader";
import NavFooter from "@/components/Navigation/NavFooter";
import { Toaster } from "@/components/ui/sonner";

const ibmPlexSans = localFont({
  src: "../../public/fonts/IBMPlexSans-Light.ttf",
  variable: "--font-ibm-plex-sans",
  display: "swap",
  preload: true,
});

const ibmPlexMono = localFont({
  src: "../../public/fonts/IBMPlexMono-Regular.ttf",
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Pragma - The network of zk-truth machines",
    template: "%s - Pragma - The network of zk-truth machines",
  },
  description:
    "Pragma is the first network of zk-truth machines. Pragma provides data feeds for decentralized applications. Oracles are dead, long live truth machines.",
  metadataBase: new URL("https://www.pragma.build"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://www.pragma.build",
    title: "Pragma - The network of zk-truth machines",
    description:
      "Pragma is the first network of zk-truth machines. Pragma provides data feeds for decentralized applications. Oracles are dead, long live truth machines.",
    siteName: "Pragma",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pragma - The network of zk-truth machines",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pragmaoracle",
    title: "Pragma - The network of zk-truth machines",
    description:
      "Pragma is the first network of zk-truth machines. Pragma provides data feeds for decentralized applications. Oracles are dead, long live truth machines.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${ibmPlexSans.className}`}
      >
        <Providers>
          <div className="text-sans flex min-h-screen flex-col items-center justify-start bg-darkGreen">
            <NavHeader />
            {children}
            <NavFooter />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
