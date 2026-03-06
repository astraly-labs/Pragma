"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/common/Button";
import GreenUpperText from "@/components/common/GreenUpperText";
import BlogCarousel from "./BlogCarousel";
import { fadeInUp } from "@/lib/animations";

const Blog = () => (
  <div className={"relative flex w-full flex-col"}>
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <GreenUpperText className="px-3 pb-3 sm:px-10 md:mx-auto md:w-11/12">
        Read our blog
      </GreenUpperText>
      <div className="md:px-18 flex w-full justify-between px-3 pb-12 sm:px-10 md:mx-auto md:w-11/12 ">
        <h2 className="text-lightGreen">Stay updated with Pragma</h2>
        <ButtonLink
          center={false}
          variant="outline"
          color="mint"
          href="https://blog.pragma.build/"
          className="hidden h-fit w-fit md:block"
        >
          Read All
        </ButtonLink>
      </div>
    </motion.div>
    <BlogCarousel />
    <ButtonLink
      center={true}
      variant="outline"
      color="mint"
      href="https://blog.pragma.build/"
      className="mt-8 block w-fit md:hidden"
    >
      Read All
    </ButtonLink>
  </div>
);

export default Blog;
