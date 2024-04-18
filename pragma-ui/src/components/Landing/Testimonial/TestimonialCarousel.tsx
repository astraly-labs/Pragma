import React from "react";
import GreenText from "../../common/GreenText";
import GreenUpperText from "../../common/GreenUpperText";
import styles from "../styles.module.scss";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Image from "next/image";

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
];

const TestimonialCarousel: React.FC = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={648}
      naturalSlideHeight={460}
      visibleSlides={1}
      totalSlides={3}
      step={1}
      infinite={true}
      dragEnabled={false}
      isIntrinsicHeight={true}
      className={styles.carouselWrapper}
    >
      <Slider className="w-full" classNameAnimation={styles.noTransition}>
        {categories.map((category, index) => (
          <Slide index={index} key={index}>
            <div className={styles.testimonyBox} key={index}>
              <div className="w-48">
                <Image alt="companyLogo" src={category.logo} />
              </div>
              <GreenText className="py-8 text-center md:text-left">
                {category.text}
              </GreenText>
              <GreenUpperText className="pb-20">
                {category.author}
              </GreenUpperText>
            </div>
          </Slide>
        ))}
      </Slider>
      <ButtonBack className="absolute right-1/2	bottom-6 -translate-x-1/4 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen transition-colors duration-300 hover:bg-lightGreen hover:text-darkGreen md:left-16 md:right-auto md:bottom-10 md:translate-x-0">
        <ArrowLeftIcon className="w-5" />
      </ButtonBack>
      <ButtonNext className="absolute left-1/2	bottom-6 translate-x-1/4 cursor-pointer rounded-full	 border border-lightGreen bg-transparent p-3 text-lightGreen transition-colors duration-300 hover:bg-lightGreen hover:text-darkGreen md:left-32 md:bottom-10 md:translate-x-0">
        <ArrowRightIcon className="w-5" />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default TestimonialCarousel;
