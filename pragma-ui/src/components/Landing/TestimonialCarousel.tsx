import React, { CSSProperties, Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import GreenText from "../common/GreenText";
import GreenUpperText from "../common/GreenUpperText";
import styles from "./styles.module.scss";

interface Category {
  logo: string;
  text: string;
  author: string;
}

const categories: Category[] = [
  {
    logo: "/assets/ecosystem/starknet.png",
    text: "Pragma Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology.",
    author: "Brian Lee CEO",
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

/**
 * Testimonial Carousel Component displaying testimonials in a carousel format.
 */
export class TestimonialCarousel extends Component {
  /**
   * Renders the Testimonial Carousel Component.
   * @return {JSX.Element} JSX for the Testimonial Carousel.
   */
  render() {
    const arrowStyles: CSSProperties = {
      position: "absolute",
      zIndex: 10,
      width: 40,
      height: 40,
      cursor: "pointer",
      borderRadius: "full",
      border: "1px lightGreen",
      bottom: 40,
    };
    return (
      <Carousel
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        className="relative "
        transitionTime={1}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 60 }}
            >
              <img src="/assets/vectors/arrowL.svg" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 120 }}
            >
              <img src="/assets/vectors/arrowR.svg" />
            </button>
          )
        }
      >
        {categories.map((category, index) => (
          <div className={styles.testimonyBox} key={index}>
            <div className="w-48">
              <img src={category.logo} />
            </div>
            <GreenText className="py-8">{category.text}</GreenText>
            <GreenUpperText className="pb-20">{category.author}</GreenUpperText>
          </div>
        ))}
      </Carousel>
    );
  }
}
