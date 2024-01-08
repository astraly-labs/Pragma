import React from "react";
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

  return (
    <div className="pb-30 relative h-full">
      <CarouselProvider
        naturalSlideWidth={150}
        naturalSlideHeight={200}
        visibleSlides={3}
        totalSlides={5}
        step={3}
        className={styles.carouselWrapper}
      >
        <Slider>
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
        <ButtonBack className="absolute bottom-0 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen hover:bg-lightGreen hover:text-darkGreen">
          <ArrowLeftIcon className="w-5" />
        </ButtonBack>
        <ButtonNext className="absolute left-16 bottom-0 cursor-pointer rounded-full border border-lightGreen bg-transparent p-3 text-lightGreen hover:bg-lightGreen hover:text-darkGreen">
          <ArrowRightIcon className="w-5" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};

export default BlogCarousel;
