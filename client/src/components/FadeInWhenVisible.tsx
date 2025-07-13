import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export default function FadeInWhenVisible({ children }: PropsWithChildren) {
  // return children
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2, // Adjust the delay between animations
          },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
