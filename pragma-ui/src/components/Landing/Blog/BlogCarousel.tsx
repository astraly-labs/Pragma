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
        setVisibleSlides(1.5); // For medium screens, show a moderate number
      } else if (window.innerWidth < 768) {
        setVisibleSlides(2.1); // For medium screens, show a moderate number
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2.5); // For medium screens, show a moderate number
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

  const dummyBlogPosts: BlogPost[] = [
    {
      image: "/assets/vectors/blog.png",
      date: "January 1, 2024",
      title: "Blog Post 1",
      description: "Description of Blog Post 1",
      link: "/blog-post-1",
    },
    {
      image: "/assets/vectors/blog.png",
      date: "February 15, 2024",
      title: "Blog Post 2",
      description: "Description of Blog Post 2",
      link: "/blog-post-2",
    },
    {
      image: "/assets/vectors/blog.png",
      date: "February 15, 2024",
      title: "Blog Post 2",
      description: "Description of Blog Post 2",
      link: "/blog-post-2",
    },
    {
      image: "/assets/vectors/blog.png",
      date: "February 15, 2024",
      title: "Blog Post 2",
      description: "Description of Blog Post 2",
      link: "/blog-post-2",
    },
    {
      image: "/assets/vectors/blog.png",
      date: "February 15, 2024",
      title: "Blog Post 2",
      description: "Description of Blog Post 2",
      link: "/blog-post-2",
    },
  ];

  const sizeOfBlogPosts = dummyBlogPosts.length;

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
          {dummyBlogPosts.map((post, index) => (
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
