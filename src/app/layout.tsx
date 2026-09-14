import { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.css";
import "@/styles/site.css";
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
    default: "Pragma | The oracle for Starknet and Miden",
    template: "%s | Pragma",
  },
  description:
    "Market data and verifiable oracle computation for applications on Starknet and Miden. Explore the feeds, inspect the sources, and start building.",
  metadataBase: new URL("https://www.pragma.build"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://www.pragma.build",
    title: "Pragma | The oracle for Starknet and Miden",
    description:
      "Market data and verifiable oracle computation for applications on Starknet and Miden. Explore the feeds, inspect the sources, and start building.",
    siteName: "Pragma",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pragma | The oracle for Starknet and Miden",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pragmaoracle",
    title: "Pragma | The oracle for Starknet and Miden",
    description:
      "Market data and verifiable oracle computation for applications on Starknet and Miden. Explore the feeds, inspect the sources, and start building.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/brand/pragma-mark.svg",
    shortcut: "/brand/pragma-mark.svg",
    apple: "/brand/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
        <Providers>
          <div className="text-sans flex min-h-screen flex-col items-center justify-start bg-darkGreen">
            <NavHeader />
            <main id="main-content" className="site-main">
              {children}
            </main>
            <NavFooter />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
