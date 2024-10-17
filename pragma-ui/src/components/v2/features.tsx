import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="relative w-full  overflow-hidden pt-20">
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm uppercase text-mint">key features</div>
        <h1 className="text-center text-lightGreen">
          Your first time coming across <br />
          <span className="text-purple">Pragma v2</span>
        </h1>
      </div>
      <div className="flex flex-col justify-center gap-10 pt-20 md:flex-row">
        <div className="flex w-full flex-col md:w-1/3">
          <Image
            src={"/assets/vectors/feature1.svg"}
            alt="feature-1"
            width={500}
            height={500}
          />
          <h5 className=" pt-4 text-center text-lightGreen">
            From an oracle network to a network of oracles
          </h5>
        </div>
        <div className="flex w-full flex-col md:w-1/3">
          <Image
            src={"/assets/vectors/feature2.svg"}
            alt="feature-1"
            width={500}
            height={500}
          />
          <h5 className=" pt-4 text-center text-lightGreen">
            Infinitely Customizable
          </h5>
        </div>
        <div className="flex w-full flex-col md:w-1/3">
          <Image
            src={"/assets/vectors/feature3.svg"}
            alt="feature-1"
            width={500}
            height={500}
          />
          <h5 className=" pt-4 text-center text-lightGreen">
            Infinitely Scalable
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Features;
