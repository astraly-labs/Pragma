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

interface Category {
  logo: string;
  text: string;
  author: string;
}

const categories: Category[] = [
  {
    logo: "/assets/ecosystem/starknet.png",
    text: "Since our testnet launch in August of last year, Pragma's price oracle has been a robust and scalable solution to zkLend’s needs. The on-chain price feed and aggregation system has proven reliable and is a valuable asset to our platform.",
    author: "Brian Fu CEO",
  },
  {
    logo: "/assets/ecosystem/canvas.png",
    text: "Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology. Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology.",
    author: "Brian Lee CEO",
  },
  {
    logo: "/assets/ecosystem/nostra.png",
    text: "Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology. Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology.",
    author: "Brian Lee CEO",
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
                <img src={category.logo} />
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
