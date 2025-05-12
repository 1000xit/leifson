"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have this utility function

// Note: Renamed LampDemo to avoid confusion, it's not used directly here.
// export function LampDemo() {
//   return (
//     <LampContainer>
//       <motion.h1
//         initial={{ opacity: 0.5, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{
//           delay: 0.3,
//           duration: 0.8,
//           ease: "easeInOut",
//         }}
//         className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
//       >
//         Build lamps <br /> the right way
//       </motion.h1>
//     </LampContainer>
//   );
// }

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    // Reduced min-height from 70vh to 50vh to make component less tall
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-white w-full pt-8 pb-20 md:pt-16 md:pb-24 z-0 min-h-[50vh]",
        className
      )}
    >
      {/* Reduced scale-y from 150 to 125 */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "35rem" }} 
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[35rem] bg-gradient-conic from-[#57DCAD] via-transparent to-transparent text-black [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "35rem" }} 
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[35rem] bg-gradient-conic from-transparent via-transparent to-[#57DCAD] text-black [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-44 w-[32rem] -translate-y-1/2 rounded-full bg-[#57DCAD]/60 opacity-60 blur-3xl"></div>
        <motion.div
          initial={{ width: "10rem" }} 
          whileInView={{ width: "20rem" }} 
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-44 w-80 -translate-y-[6rem] rounded-full bg-[#57DCAD]/90 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }} 
          whileInView={{ width: "35rem" }} 
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-1 w-[35rem] -translate-y-[7rem] bg-[#57DCAD]"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white "></div>
      </div>

      {/* Reduced negative translate-y values to move content up less */}
      <div className="relative z-50 flex -translate-y-36 md:-translate-y-48 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}; 