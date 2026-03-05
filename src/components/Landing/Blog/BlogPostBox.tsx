import React from "react";
import styles from "../styles.module.scss";
import { ButtonLink } from "../../common/Button";
import clsx from "clsx";
import Image from "next/image";

interface BlogPostBoxProps {
  image: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

const BlogPostBox: React.FC<BlogPostBoxProps> = ({
  image,
  date,
  title,
  description,
  link,
}) => {
  return (
    <div className={clsx(styles.blogBox, "group")}>
      <div className="w-full overflow-hidden">
        <Image
          width={500}
          height={200}
          src={image}
          alt="blogIllustration"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-between p-6 pb-2 text-left">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 pb-3 text-sm uppercase leading-4 text-lightGreen">
            <span className="inline-block h-3 w-0.5 rounded-full bg-mint/60" />
            {date}
          </div>
          <h5 className="leading-14 pb-3 text-lightGreen">{title}</h5>
          <div
            className={clsx(
              styles.overflowContainer,
              "hidden pb-8 text-sm text-LightGreenFooter md:block"
            )}
          >
            {description}
          </div>
        </div>
        <ButtonLink
          variant="outline"
          color="lightGreen"
          center={false}
          href={link}
          className="mb-6 mt-auto"
        >
          Read article
        </ButtonLink>
      </div>
    </div>
  );
};

export default BlogPostBox;
