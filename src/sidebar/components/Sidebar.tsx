import { motion, useIsPresent } from "motion/react";

import type { SidebarProps } from "@/sidebar/types";

import { styles } from "@/util";
import useSidebar from "@/sidebar/hooks/useSidebar";

export default function Sidebar({ children, className, style, ...props }: SidebarProps) {
  const isPresent = useIsPresent();
  const { sidebarBackgroundColor } = useSidebar();

  return (
    <motion.aside
      role="dialog"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%", transition: { duration: 0.1, ease: "easeIn" } }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      {...props}
      className={styles("sencorp-sidebar-content", className).className}
      style={{
        position: "absolute",
        boxSizing: "border-box",
        width: "24rem",
        height: "100%",
        overflowY: "auto",
        top: 0,
        right: 0,
        bottom: 0,
        maxWidth: "100%",
        backgroundColor: sidebarBackgroundColor,
        ...style,
        pointerEvents: isPresent ? (style?.pointerEvents ?? "auto") : "none",
      }}
    >
      {children}
    </motion.aside>
  );
}
