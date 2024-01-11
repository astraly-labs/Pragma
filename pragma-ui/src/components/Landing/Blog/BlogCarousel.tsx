import React, { useEffect, useState } from "react";
import BlogPostBox from "./BlogPostBox";
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

interface BlogPost {
  image: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

const BlogCarousel: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      // Update the number of visible slides based on screen width
      if (window.innerWidth < 400) {
        setVisibleSlides(1.1); // For smaller screens, show fewer slides
      } else if (window.innerWidth < 640) {
        setVisibleSlides(1.4); // For medium screens, show a moderate number
      } else if (window.innerWidth < 768) {
        setVisibleSlides(1.8); // For medium screens, show a moderate number
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2.1); // For medium screens, show a moderate number
      } else {
        setVisibleSlides(3.1); // For larger screens, show more slides
      }
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Call handleResize on initial load
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const BlogPosts: BlogPost[] = [
    {
      image:
        "https://images.mirror-media.xyz/publication-images/zZert-yfY3OFeuCAhNcMP.jpeg?height=512&width=1024",
      date: "December 1st, 2023",
      title: "Introducing the Verifiable Random Function in Cairo 1",
      description:
        "We are thrilled to announce the first phase of Pragma VRF, leveraging verifiable random functions to generate onchain verifiable randomness. Pragma VRF will greatly help...",
      link: "https://mirror.xyz/pragmagic.eth/AtrYK2CLU9uflovElf8pO1U2mjyspdMqjfTV9yizWeI",
    },
    {
      image:
        "https://images.mirror-media.xyz/publication-images/yDlZUg0hFCJuzPS_6wAri.jpeg?height=512&width=1024",
      date: "November 29th, 2023",
      title: "Exploring Pragma's Security",
      description:
        "We're thrilled to (officially) announce our bounty program on Immunefi, offering up to $50,000 for discovering vulnerabilities in our smart contracts. If you're proficient in Cairo and keen on assisting us in securing our Oracle...",
      link: "https://mirror.xyz/pragmagic.eth/I_sNYLA1RvJoFFvPPoL-aTp52r4XRe6Y2zpWqTIBelw",
    },
    {
      image: "https://images.mirror-media.xyz/nft/RzZhNkJCO447zAbKTXPh6.png",
      date: "September 7th, 2023",
      title: "(RE)Introducing Pragma on Starknet",
      description:
        "Pragma is the leading Oracle on Starknet. It provides off-chain data to all DeFi happening on Starknet. Pragma is built from the ground up to remove any trust assumptions...",
      link: "https://mirror.xyz/pragmagic.eth/_HKhpTGRG4SiCw6PS2vZ88Ssvgix_UVw2OMg3vD8O14",
    },
    {
      image: "https://images.mirror-media.xyz/nft/gpEaXet0nQaanR_aWd_ED.png",
      date: "August 21st, 2023",
      title: "Oracles are dead, Long live Oracles",
      description:
        "For as long as blockchains have been programmable, developers have attempted to bring data on-chain. Blockchains offer amazing properties, especially in terms of transparency, immutability, and openness...",
      link: "https://mirror.xyz/pragmagic.eth/Hq509KXkqmdsWK7niszCXW-XaVc1WfmQBMUqjjrx2eY",
    },
  ];

  const sizeOfBlogPosts = BlogPosts.length;

  return (
    <div className="pb-30">
      <CarouselProvider
        naturalSlideWidth={150}
        naturalSlideHeight={200}
        visibleSlides={visibleSlides}
        totalSlides={sizeOfBlogPosts}
        step={1}
        className={styles.carouselWrapper}
      >
        <Slider className=" sm:pl-8">
          {BlogPosts.map((post, index) => (
            <Slide index={index} key={index}>
              <BlogPostBox
                image={post.image}
                date={post.date}
                title={post.title}
                description={post.description}
                link={post.link}
                key={index}
              />
            </Slide>
          ))}
        </Slider>
        <div className="relative lg:h-20 xl:h-0">
          <ButtonBack className="absolute bottom-0 left-10 hidden cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen hover:bg-lightGreen hover:text-darkGreen lg:block">
            <ArrowLeftIcon className="w-5" />
          </ButtonBack>
          <ButtonNext className="absolute left-24 bottom-0 hidden cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen hover:bg-lightGreen hover:text-darkGreen lg:block">
            <ArrowRightIcon className="w-5" />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default BlogCarousel;
