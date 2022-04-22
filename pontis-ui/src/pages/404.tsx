import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Custom404Page = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("Single-page application, returning home");
    router.push("/");
  }, []);

  return (
    <div className="text-center">
      <div className="text-3xl mt-2">404 | Page not found</div>
    </div>
  );
};

export default Custom404Page;
