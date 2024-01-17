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
  integration: string;
  category: string;
  avatar: string;
}

const categories: Category[] = [
  {
    logo: "/assets/ecosystem/starknet.png",
    text: "Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology.",
    author: "Brian Lee CEO",
    integration:
      "Text about the intergration Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis consequat tellus. Phasellus sed bibendum ex. Proin tortor lectus, cursus sit amet consequat non, vestibulum in nisi.",
    category: "lending",
    avatar: "/Avatars.svg",
  },
  {
    logo: "/assets/ecosystem/canvas.png",
    text: "Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology. Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology.",
    author: "Brian Lee CEO",
    integration:
      "Text about the intergration Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis consequat tellus. Phasellus sed bibendum ex. Proin tortor lectus, cursus sit amet consequat non, vestibulum in nisi.",
    category: "lending",
    avatar: "/Avatars.svg",
  },
  {
    logo: "/assets/ecosystem/nostra.png",
    text: "Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology. Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology.",
    author: "Brian Lee CEO",
    integration:
      "Text about the intergration Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis consequat tellus. Phasellus sed bibendum ex. Proin tortor lectus, cursus sit amet consequat non, vestibulum in nisi.",
    category: "lending",
    avatar: "/Avatars.svg",
  },
];

const CustomerCarousel: React.FC = () => {
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
            <div className={styles.customerBox} key={index}>
              <ButtonBack className="absolute right-1/2 bottom-6 -translate-x-1/4 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen hover:bg-lightGreen hover:text-darkGreen md:left-16 md:right-auto md:bottom-10 md:translate-x-0">
                <ArrowLeftIcon className="w-5" />
              </ButtonBack>
              <ButtonNext className="absolute left-1/2 bottom-6 translate-x-1/4	 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen hover:bg-lightGreen hover:text-darkGreen md:left-32 md:bottom-10 md:translate-x-0">
                <ArrowRightIcon className="w-5" />
              </ButtonNext>
              <div className="flex w-full flex-col gap-6 md:w-6/12">
                <div className="w-fit rounded-full bg-lightBlur px-4 py-2 text-xs uppercase text-lightGreen">
                  {category.category}
                </div>
                <div className="w-48">
                  <img src={category.logo} />
                </div>
                <GreenText className="text-center md:pb-32 md:text-left">
                  {category.integration}
                </GreenText>
              </div>
              <div className={styles.testimonialBox}>
                <div className="text-lg text-lightGreen">{category.text}</div>
                <div className="flex flex-row gap-4">
                  <img src={category.avatar} alt="avatar" />
                  <GreenUpperText className="flex items-center">
                    {category.author}
                  </GreenUpperText>
                </div>
              </div>
              <div className="block h-10 md:hidden" />
            </div>
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};

export default CustomerCarousel;
