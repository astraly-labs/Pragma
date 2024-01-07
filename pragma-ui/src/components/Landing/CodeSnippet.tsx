import React from "react";
import styles from "./styles.module.scss";
import GreenBox from "../common/GreenBox";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "../common/Button";
import { ClipboardCopyIcon } from "@heroicons/react/outline";

interface Category {
  title: string;
}

export default function CodeSnippet() {
  const [isCopied, setIsCopied] = useState(false);
  async function copyCode() {
    setIsCopied(true);
    await new Promise((f) => setTimeout(f, 1500));
    setIsCopied(false);
  }
  const [categories] = useState<Category[]>([
    {
      title: "Price Feed",
    },
    {
      title: "Realized Vol",
    },
    {
      title: "VRF",
    },
  ]);

  return (
    <GreenBox className="relative w-full">
      <div className=" w-full">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-full bg-lightBlur">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-full p-6 text-sm font-medium leading-5",
                    "focus:outline-none",
                    selected
                      ? "bg-mint text-darkGreen"
                      : "text-lightGreen hover:text-white"
                  )
                }
              >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"h-full "}>
            <Tab.Panel
              className={"h-full pt-6 font-mono leading-7 text-codeColor"}
              key={1}
            >
              <span className={classNames(styles.greenCode)}>function </span>
              <span className={classNames(styles.purpleCode)}>getThePrice</span>
              ()
              <span className={classNames(styles.greenCode)}>
                {" "}
                public view returns{" "}
              </span>
              (<span className={classNames(styles.purpleCode)}>int</span>){"{"}
              <br /> (<br />
              <span className={classNames(styles.greenCode)}>felt </span>
              test;
              <br />
              <span className={classNames(styles.greenCode)}>felt </span>
              IdkanyCairo; <br /> ) ={" "}
              <span className={classNames(styles.purpleCode)}>priceFeed</span>.
              <span className={classNames(styles.purpleCode)}>ImnotDev</span>();
              <br />
              <div className="absolute bottom-9">
                <CopyToClipboard
                  text="pip install pragma-sdk"
                  onCopy={() => copyCode()}
                >
                  <Button variant="solid" color="grey" center={false}>
                    <img src="/assets/vectors/copy.svg" className="pr-3" />
                    Copy Code
                  </Button>
                </CopyToClipboard>
              </div>
            </Tab.Panel>
            <Tab.Panel className={"pt-6"} key={1}>
              {" "}
              <div className="absolute bottom-9">
                <CopyToClipboard
                  text="pip install pragma-sdk"
                  onCopy={() => copyCode()}
                >
                  <Button variant="solid" color="grey" center={false}>
                    <img src="/assets/vectors/copy.svg" className="pr-3" />
                    Copy Code
                  </Button>
                </CopyToClipboard>
              </div>
            </Tab.Panel>
            <Tab.Panel className={"pt-6"} key={1}>
              {" "}
              <div className="absolute bottom-9">
                <CopyToClipboard
                  text="pip install pragma-sdk"
                  onCopy={() => copyCode()}
                >
                  <Button variant="solid" color="grey" center={false}>
                    <img src="/assets/vectors/copy.svg" className="pr-3" />
                    Copy Code
                  </Button>
                </CopyToClipboard>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </GreenBox>
  );
}
