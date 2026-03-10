"use client";

import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

interface PopoverContent {
  name: string;
  description: string;
  href: string;
  icon: string;
}

interface NavPopoverProps {
  buttonName: string;
  content: PopoverContent[];
  isOpen: boolean;
  description?: string;
}

const NavPopover: React.FC<NavPopoverProps> = ({
  buttonName,
  content,
  isOpen,
  description,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePopoverPosition = () => {
      const popover = popoverRef.current;
      if (popover) {
        const rect = popover.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right > viewportWidth) {
          popover.style.left = `${viewportWidth - rect.width}px`;
        }

        if (rect.bottom > viewportHeight) {
          popover.style.top = `${viewportHeight - rect.height}px`;
        }
      }
    };

    if (isOpen) {
      handlePopoverPosition();
      window.addEventListener("resize", handlePopoverPosition);
    }

    return () => {
      window.removeEventListener("resize", handlePopoverPosition);
    };
  }, [isOpen]);

  return (
    <div className="relative text-lightGreen">
      <span
        className={clsx(
          isOpen ? "text-lightGreen hover:text-white" : "text-grey",
          "group inline-flex items-center rounded-md text-base font-medium hover:text-white focus:outline-hidden"
        )}
      >
        <span>{buttonName}</span>
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 z-50 mt-3 ml-0 flex min-w-fit -translate-x-1/2 transform flex-row gap-5 rounded-xl border border-lightGreen/10 bg-[#082f28ee] shadow-2xl shadow-black/30 backdrop-blur-2xl"
          >
            <div className="min-w-md flex w-60 flex-col gap-3 p-5">
              <h5 className="text-mint">{buttonName}</h5>
              <div>{description}</div>
            </div>
            <div className={clsx("rounded-xl shadow-lg", styles.popoverPanel)}>
              <div className="bg-dark relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                {content.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-whiteTrans lg:w-72"
                  >
                    <Image
                      className="my-auto h-4 w-4 text-lightGreen"
                      src={item.icon}
                      alt={"logo"}
                      height={20}
                      width={20}
                    />
                    <div className="ml-4">
                      <p className="text-base font-medium text-lightGreen">
                        {item.name}
                      </p>
                      <p className="text-grey mt-1 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavPopover;
