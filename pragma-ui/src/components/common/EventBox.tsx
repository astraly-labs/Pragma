import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
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
      last ? styles.lastBox : "",
      "items- grid grid-cols-4"
    )}
    {...props}
  >
    <div className="leading-14 flex h-full items-center text-lg font-light text-lightGreen sm:text-2xl">
      {name}
    </div>
    <GreenUpperText className="flex h-full items-center pt-1 md:tracking-wider">
      {location}
    </GreenUpperText>
    <GreenUpperText className="flex h-full items-center pt-1 md:tracking-wider">
      {date}
    </GreenUpperText>
    <a
      href={link}
      className="ml-auto cursor-pointer rounded-full border border-mint bg-transparent p-3 text-mint hover:bg-mint hover:text-darkGreen"
    >
      <ArrowRightIcon className="w-5 cursor-pointer" />
    </a>
  </div>
);

export default EventBox;
