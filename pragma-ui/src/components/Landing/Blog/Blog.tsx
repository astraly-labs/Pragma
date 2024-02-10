import React from "react";
import { ButtonLink } from "../../common/Button";
import GreenUpperText from "../../common/GreenUpperText";
import GreenTitle from "../../common/GreenTitle";
import BlogCarousel from "./BlogCarousel";

const Blog = () => (
  <div className={"relative flex w-full flex-col"}>
    <GreenUpperText className="md:px-18 px-3 pb-3 sm:px-10">
      Read our blog
    </GreenUpperText>
    <div className="md:px-18 flex w-full justify-between px-3 pb-12 sm:px-10 ">
      <h2 className="text-lightGreen">Stay updated with Pragma</h2>
      <ButtonLink
        center={false}
        variant="outline"
        color="mint"
        href="https://mirror.xyz/pragmagic.eth"
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
      href="https://mirror.xyz/pragmagic.eth"
      className="mt-8 block w-fit md:hidden"
    >
      Read All
    </ButtonLink>
  </div>
);

export default Blog;
