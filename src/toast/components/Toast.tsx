import { motion, useIsPresent } from "motion/react";

import type { ToastProps } from "@/toast/types";
import { styles } from "@/util";

export default function Toast({ children, className, style, ...props }: ToastProps) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
      aria-hidden={isPresent ? undefined : true}
      className={styles("sencorp-toast", className).className}
      style={{ position: "relative", ...style, pointerEvents: isPresent ? (style?.pointerEvents ?? "auto") : "none" }}
    >
      {children}
    </motion.div>
  );
}
