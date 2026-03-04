"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import GreenUpperText from "@/components/common/GreenUpperText";
import GreenText from "@/components/common/GreenText";
import EventBox from "@/components/common/EventBox";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const events = [
  {
    name: "Campus",
    location: "Punta Cana",
    date: "3 NOV 2024",
    link: "https://www.campuspuntacana.com/apply",
  },
  {
    name: "DevCon",
    location: "Thailand",
    date: "12 NOV 2024",
    link: "https://devcon.org/en/",
  },
];

const Events = () => (
  <div
    className={clsx(
      "align-row max-w-screen flex w-full flex-col gap-10 overflow-hidden py-4 md:flex-row md:gap-28 md:py-28 lg:px-10"
    )}
  >
    <motion.div
      className="flex w-full flex-col justify-center md:w-5/12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <GreenUpperText className="pb-3">Events</GreenUpperText>
      <h2 className="pb-6 text-lightGreen">Find us at these events</h2>
      <GreenText>
        Meet us at these events. Coffee is on us, we like crypto, oracles,
        Austrian economy, elliptic curves, Rust, Cairo and so much more.{" "}
      </GreenText>
    </motion.div>
    <motion.div
      className="flex w-full flex-col justify-start md:w-6/12"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {events.map((event, index: number) => (
        <motion.div key={index} variants={staggerItem}>
          <EventBox
            name={event.name}
            location={event.location}
            date={event.date}
            link={event.link}
            last={index === events.length - 1}
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export default Events;
