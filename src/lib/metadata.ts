import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  canonical: string,
  image?: string
): Metadata {
  const socialTitle = `${title} | Pragma`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: "Pragma",
      type: "website",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@PragmaOracle",
      title: socialTitle,
      description,
      ...(image && { images: [{ url: image, alt: socialTitle }] }),
    },
  };
}
