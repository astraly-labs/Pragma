import React from "react";
import styles from "../styles.module.scss";
import { ButtonLink } from "../../common/Button";

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
    <div className={styles.blogBox}>
      <div className="w-full">
        <img src={image} />
      </div>
      <div className="flex h-full w-full flex-col justify-between p-6 text-left">
        <div className="flex flex-col">
          <div className="pb-3 text-sm uppercase leading-4 text-lightGreen">
            {date}
          </div>
          <div className="leading-14 pb-3 text-2xl font-light text-lightGreen">
            {title}
          </div>
          <div className="pb-8 text-sm text-lightGreen">{description}</div>
        </div>
        <ButtonLink
          variant="outline"
          color="lightGreen"
          center={false}
          href={link}
          className="mb-6 mt-auto"
        >
          Read more
        </ButtonLink>
      </div>
    </div>
  );
};

export default BlogPostBox;
