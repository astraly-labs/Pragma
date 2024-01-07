import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
import GreenTitle from "./GreenTitle";
import GreenText from "./GreenText";
import { ButtonLink } from "./Button";
import { ArrowRightIcon } from "@heroicons/react/outline";

interface EventsProps {
  name: string;
  location: string;
  date: string;
  link: string;
  last?: boolean;
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const EventBox: React.FC<EventsProps> = ({
  name,
  location,
  date,
  link,
  last,
  className,
  ...props
}) => (
  <div
    className={classNames(
      className,
      styles.eventBox,
      last ? styles.lastBox : ""
    )}
    {...props}
  >
    <div className="leading-14 text-2xl font-light text-lightGreen">{name}</div>
    <GreenUpperText>{location}</GreenUpperText>
    <GreenUpperText>{date}</GreenUpperText>
    <a
      href={link}
      className="ml-auto cursor-pointer rounded-full border border-mint bg-transparent p-3 text-mint hover:bg-mint hover:text-darkGreen"
    >
      <ArrowRightIcon className="w-5 cursor-pointer" />
    </a>
  </div>
);

export default EventBox;
