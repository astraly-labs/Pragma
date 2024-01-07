import React from "react";
import { ButtonLink } from "../../common/Button";
import GreenUpperText from "../../common/GreenUpperText";
import GreenTitle from "../../common/GreenTitle";
import BlogCarousel from "./BlogCarousel";

const Blog = () => (
  <div className="flex w-full flex-col">
    <GreenUpperText className="pb-3">Read our blog</GreenUpperText>
    <div className="flex w-full justify-between pb-12">
      <GreenTitle>Stay updated with Pragma</GreenTitle>
      <ButtonLink variant="outline" color="mint" href="/">
        Read All
      </ButtonLink>
    </div>
    <BlogCarousel />
  </div>
);

export default Blog;
