import React from "react";
import Link from "next/link";
import { ChatIcon, HomeIcon } from "@heroicons/react/outline";

const Custom404Page = () => {
  return (
    <div className="w-screen grow bg-slate-50 px-6 pt-10 pb-24 sm:px-24 md:py-32 md:px-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 sm:space-y-10 md:space-y-16">
        <img
          src="/assets/astronaut.png"
          alt="Broken Clock"
          className="w-32 sm:w-48"
        />
        <div>
          <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl md:text-4xl">
            404&#8194;&#8211;&#8194;This page is lost in space
          </h1>
          <p className="prose prose-slate md:prose-xl">
            You thought this mission to the moon would be a quick six month
            thing. Your neighbor offered to look after your dog. Your high
            school math teacher was impressed. He once said you wouldn’t amount
            to anything. You sure proved them wrong. But now here you are, fifty
            feet from your spaceship with zero knowledge on how to get back.
            Your dog will be so sad. Your math teacher will be so smug. Pretty
            devastating.
          </p>
        </div>
        <div className="flex flex-col space-y-8 text-center sm:flex-row sm:space-x-12 sm:space-y-0">
          <Link href="/">
            <a className="flex cursor-pointer items-center rounded-lg bg-slate-700 px-4 py-3 text-slate-50 shadow-lg hover:bg-slate-800 hover:shadow-xl md:px-6 md:py-4 md:text-xl">
              <HomeIcon className="mr-2 h-5 w-5" />
              Return home
            </a>
          </Link>
          <a
            href="mailto:oskar@42labs.xyz?body=Hi%20Oskar,"
            className="relative flex cursor-pointer items-center rounded-lg bg-slate-300 px-4 py-3 text-slate-700 shadow-lg hover:bg-slate-400 hover:shadow-xl md:px-6 md:py-4 md:text-xl"
          >
            <ChatIcon className="mr-2 h-5 w-5" />
            Request asset
          </a>
        </div>
      </div>
    </div>
  );
};

export default Custom404Page;
