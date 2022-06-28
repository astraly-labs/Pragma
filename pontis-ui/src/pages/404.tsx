import React from "react";
import Link from "next/link";
import { ChatIcon, HomeIcon } from "@heroicons/react/outline";

const Custom404Page = () => {
  return (
    <div className="w-screen grow bg-slate-50 px-6 pt-4 pb-24 sm:px-24 md:px-32 md:pt-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 sm:space-y-10 md:space-y-16">
        <img
          src="/assets/tourist.png"
          alt="Broken Clock"
          className="w-32 sm:w-48"
        />
        <div>
          <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl md:text-4xl">
            404&#8194;&#8211;&#8194;Zero knowledge of this page
          </h1>
          <p className="prose prose-slate md:prose-xl">
            You told your friends you weren’t bringing your phone, to try and
            experience what travel was like back in the day. You bought a map
            and a bottle of water and carried your camera for the money shot.
            But the map was from 2005, the landscape had changed and no one had
            verified the map. So here you are, in the middle of a large field,
            that the map continues to claim is a local grocer.
          </p>
        </div>
        <div className="flex flex-col space-y-8 text-center sm:flex-row sm:space-x-12 sm:space-y-0">
          {/* Should turn the bottom into two components. */}
          <Link href="/">
            <a className="flex cursor-pointer items-center rounded-lg bg-slate-700 px-4 py-3 text-slate-50 shadow-lg hover:bg-slate-800 hover:shadow-xl md:px-6 md:py-4 md:text-xl">
              <HomeIcon className="mr-2 h-5 w-5" />
              Return home
            </a>
          </Link>
          <a
            href="mailto:oskar@42labs.xyz?body=Hi%20Oskar,"
            className="flex cursor-pointer items-center rounded-lg bg-slate-300 px-4 py-3 text-slate-700 shadow-lg hover:bg-slate-400 hover:shadow-xl md:px-6 md:py-4 md:text-xl"
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
