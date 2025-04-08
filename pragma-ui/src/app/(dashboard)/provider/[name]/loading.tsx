import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import styles from "@/pages/styles.module.scss";
import BoxContainer from "@/components/common/BoxContainer";

const Loading = () => {
  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden pt-24 md:pt-40",
        styles.bigScreen
      )}
    >
      <BoxContainer>
        <Link
          href="/assets"
          className="flex w-full cursor-pointer items-center gap-2 text-left text-sm uppercase tracking-widest text-lightGreen"
        >
          <Image
            className="my-auto pl-2"
            height={30}
            width={30}
            alt="arrowDown"
            src="/assets/vectors/prev.svg"
          />
          Back to feeds
        </Link>
      </BoxContainer>
      <BoxContainer>
        <div
          className={classNames(
            "w-full flex-col justify-between gap-8 self-stretch md:flex-row md:gap-5",
            styles.greenBox
          )}
        >
          <div className="flex flex-row gap-4">
            <div className="my-auto  h-20 w-20 animate-pulse rounded-full bg-lightBlur"></div>
            <div className="flex flex-col gap-2">
              <div className="my-auto  h-10 w-28 animate-pulse rounded-full bg-lightBlur"></div>
              <div className="my-auto  h-5 w-14 animate-pulse rounded-full bg-lightBlur"></div>
            </div>
          </div>
          <div className="my-auto  h-20 w-full animate-pulse rounded-full bg-lightBlur md:w-80"></div>
        </div>
      </BoxContainer>
      <BoxContainer>
        <div className="my-auto  mt-8 h-80 w-full animate-pulse rounded-xl bg-lightBlur"></div>
      </BoxContainer>
      <BoxContainer>
        <div className="my-auto  mt-8 h-80 w-full animate-pulse rounded-xl bg-lightBlur"></div>
      </BoxContainer>
    </div>
  );
};

export default Loading;
