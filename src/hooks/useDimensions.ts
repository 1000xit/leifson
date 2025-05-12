import { useEffect } from "react";
import { motionValue } from "framer-motion";

const useDimensions = () => {
  const width = motionValue(typeof window !== "undefined" ? window.innerWidth : 1000);
  const height = motionValue(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDimensions = () => {
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [width, height]);

  return { width, height };
};

export default useDimensions; 