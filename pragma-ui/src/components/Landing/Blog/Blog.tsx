import React from "react";
import { ButtonLink } from "../../common/Button";
import GreenUpperText from "../../common/GreenUpperText";
import GreenTitle from "../../common/GreenTitle";
import BlogCarousel from "./BlogCarousel";

const Blog = () => (
  <div className="flex h-fit w-full flex-col  md:px-10">
    <GreenUpperText className="pb-3">Read our blog</GreenUpperText>
    <div className="flex w-full justify-between pb-12">
      <GreenTitle>Stay updated with Pragma</GreenTitle>
      <ButtonLink
        center={false}
        variant="outline"
        color="mint"
        href="/"
        className="hidden h-fit w-fit md:block"
      >
        Read All
      </ButtonLink>
    </div>
    <BlogCarousel />
    <ButtonLink
      center={true}
      variant="outline"
      color="mint"
      href="/"
      className="block w-fit md:hidden"
    >
      Read All
    </ButtonLink>
  </div>
);

export default Blog;
