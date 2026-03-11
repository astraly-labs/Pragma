"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "../styles.module.scss";
import GreenText from "@/components/common/GreenText";
import GreenUpperText from "@/components/common/GreenUpperText";
import clsx from "clsx";

interface Category {
  logo: string;
  text: string;
  author: string;
}

const categories: Category[] = [
  {
    logo: "/assets/ecosystem/zklendfull.svg",
    text: "Since our testnet launch in August of last year, Pragma's price oracle has been a robust and scalable solution to zkLend’s needs. The on-chain price feed and aggregation system has proven reliable and is a valuable asset to our platform.",
    author: "Brian Fu CEO",
  },
  {
    logo: "/assets/ecosystem/nostra.png",
    text: "We are pleased to partner with the Pragma team and integrating their StarkNet native oracle to our Defi products.",
    author: "David Garai CEO",
  },
  {
    logo: "/assets/ecosystem/starkware.svg",
    text: "The Pragma team has attracted fantastic data partners and Pragma is already one of the leading protocols on StarkNet. I am excited to see them leverage zk-technology to build out their vision of decentralized, transparent and composable data feeds.",
    author: "Uri Kolodny ex-CEO",
  },
  {
    logo: "/assets/ecosystem/vesu.png",
    text: "  Pragma’s fully on-chain oracle is essential for our permissionless money markets. The open-source liquidation bot we built together is a prime example of how this collaboration strengthens Vesu & the entire Starknet ecosystem.",
    author: "Nils Bundi, co-founder",
  },
];

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={clsx(styles.carouselWrapper, "relative h-[520px]")}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex w-full max-w-[648px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`shrink-0 w-full md:w-[648px] px-4 pt-2`}
            >
              <div
                className={clsx(styles.testimonyBox, "relative h-4/5")}
                style={{ boxShadow: "inset 0 0 0 1px rgba(21,255,129,0.08)" }}
              >
                <span
                  className="pointer-events-none absolute right-6 top-4 font-sans text-[120px] font-bold leading-none text-mint/5 select-none"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <div className="w-48">
                  <Image
                    height={40}
                    width={150}
                    alt="companyLogo"
                    src={category.logo}
                  />
                </div>
                <GreenText className="py-8 text-center md:text-left">
                  {category.text}
                </GreenText>
                <GreenUpperText className="pb-20">
                  {category.author}
                </GreenUpperText>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute right-1/2 bottom-6 -translate-x-1/4 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen transition-colors duration-300 hover:scale-110 hover:bg-lightGreen hover:text-darkGreen active:scale-95 md:left-16 md:right-auto md:bottom-10 md:translate-x-0"
      >
        <ArrowLeft className="w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute left-1/2 bottom-6 translate-x-1/4 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen transition-colors duration-300 hover:scale-110 hover:bg-lightGreen hover:text-darkGreen active:scale-95 md:left-32 md:bottom-10 md:translate-x-0"
      >
        <ArrowRight className="w-5" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;
