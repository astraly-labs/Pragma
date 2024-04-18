import React from "react";
import styles from "../styles.module.scss";
import { ButtonLink } from "../../common/Button";
import classNames from "classnames";

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
        <img src={image} alt="blogIllustration" />
      </div>
      <div className="flex h-full w-full flex-col justify-between p-6 pb-2 text-left">
        <div className="flex flex-col">
          <div className="pb-3 text-sm uppercase leading-4 text-lightGreen">
            {date}
          </div>
          <h5 className="leading-14 pb-3 text-lightGreen">{title}</h5>
          <div
            className={classNames(
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
