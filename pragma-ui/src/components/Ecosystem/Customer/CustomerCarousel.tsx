"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Image from "next/image";
import styles from "../styles.module.scss";
import GreenText from "@/components/common/GreenText";
import GreenUpperText from "@/components/common/GreenUpperText";
import classNames from "classnames";

interface Category {
  logo: string;
  text: string;
  author: string;
  integration: string;
  category: string;
  avatar: string;
}

const categories: Category[] = [
  {
    logo: "/assets/ecosystem/zklendfull.svg",
    text: "Since our testnet launch in August of last year, Pragma's price oracle has been a robust and scalable solution to zkLend’s needs. The on-chain price feed and aggregation system has proven reliable and is a valuable asset to our platform.",
    author: "Brian Fu CEO",
    integration:
      "ZkLend leverages Pragma to ensure the collateral locked in the protocol is valuable enough to borrow. Pragma's robust price feeds make sure ZkLend doesn't end up with bad debt.",
    category: "lending",
    avatar: "/assets/chads/brian.jpg",
  },
  {
    logo: "/assets/ecosystem/vesu.png",
    text: "Pragma's unique oracle design enabled us to build fail-safe price feeds in a fully immutable protocol. The additional data and tools available are extremely valuable to build resilient protocols and ultimately safeguard user funds.",
    author: "Nils Bundi CEO",
    integration:
      "Vesu leverages Pragma composable and fully onchain infrastructure at its best in order to safely manage collateral, and enable new markets on Vesu.",
    category: "lending",
    avatar: "/assets/chads/nils.jpeg",
  },
  {
    logo: "/assets/ecosystem/nostra.png",
    text: "We are pleased to partner with the Pragma team and integrating their StarkNet native oracle to our Defi products.",
    author: "David Garai CEO",
    integration:
      "Nostra leverages Pragma in their lending protocol, to make sure no bad debt is accrued in the protocol. You can borrow and lend safely on Nostra thanks to Pragma.",
    category: "lending",
    avatar: "/assets/chads/david.webp",
  },
];

const CustomerCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <div
      className={classNames(styles.carouselWrapper, "relative overflow-hidden")}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {categories.map((category, index) => (
            <div key={index} className="flex-shrink-0 w-full px-4">
              <div className={classNames(styles.customerBox, "relative")}>
                {/* Navigation Buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute right-1/2 bottom-6 -translate-x-1/4 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen transition-colors duration-300 hover:bg-lightGreen hover:text-darkGreen md:left-16 md:right-auto md:bottom-10 md:translate-x-0"
                >
                  <ArrowLeftIcon className="w-5" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute left-1/2 bottom-6 translate-x-1/4 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen transition-colors duration-300 hover:bg-lightGreen hover:text-darkGreen md:left-32 md:bottom-10 md:translate-x-0"
                >
                  <ArrowRightIcon className="w-5" />
                </button>

                {/* Content */}
                <div className="flex w-full flex-col gap-6 md:w-6/12">
                  <div className="w-fit rounded-full bg-lightBlur px-4 py-2 text-xs uppercase tracking-widest text-lightGreen">
                    {category.category}
                  </div>
                  <div className="w-48">
                    <Image
                      width={140}
                      height={30}
                      alt="companyLogo"
                      src={category.logo}
                    />
                  </div>
                  <GreenText className="text-center md:pb-32 md:text-left">
                    {category.integration}
                  </GreenText>
                </div>

                <div className={styles.testimonialBox}>
                  <div className="text-lg text-lightGreen">{category.text}</div>
                  <div className="flex flex-row gap-4 pt-6">
                    <Image
                      src={category.avatar}
                      height={48}
                      width={48}
                      className={styles.avatar}
                      alt="avatar"
                    />
                    <GreenUpperText className="flex items-center">
                      {category.author}
                    </GreenUpperText>
                  </div>
                </div>

                <div className="block h-10 md:hidden" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerCarousel;
