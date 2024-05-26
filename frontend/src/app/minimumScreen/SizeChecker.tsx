"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SizeChecker = ({ children }: { children: React.ReactNode }) => {
  const [isWindowSizeValid, setIsWindowSizeValid] = useState(true);

  const checkWindowSize = () => {
    if (window.innerWidth > 500) {
      // Change 1200 to your desired width threshold
      setIsWindowSizeValid(false);
    } else {
      setIsWindowSizeValid(true);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.tronWeb) {
  //     setTronWeb(window.tronWeb);
  //   }
  // }, []);

  // useEffect(() => {
  //   checkWindowSize();
  //   window.addEventListener("resize", checkWindowSize);
  //   return () => {
  //     window.removeEventListener("resize", checkWindowSize);
  //   };
  // }, []);

  if (!isWindowSizeValid) {
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center">
          <Image
            src="/images/error-404.svg"
            alt="404 Error"
            width="250"
            height="50"
          />
        </div>
        <div className="text-center">
          This site is optimised for browsers lesser than 500px only.
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SizeChecker;
