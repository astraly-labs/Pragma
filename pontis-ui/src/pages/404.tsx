import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Custom404Page = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("Page not found, returning home");
    router.push("/");
  }, [router]);

  return (
    <div className="text-center">
      <div className="mt-2 text-3xl">404 | Page not found</div>
    </div>
  );
};

export default Custom404Page;
