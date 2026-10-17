import { motion, useIsPresent } from "motion/react";

import { styles } from "@/util";
import useSidebar from "@/sidebar/hooks/useSidebar";

export default function SidebarBackdrop() {
  const isPresent = useIsPresent();
  const { sidebarBackdropColor, sidebarBackdropClassName, pop } = useSidebar();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !isPresent) return;
    event.stopPropagation();
    pop();
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: sidebarBackdropColor,
        pointerEvents: isPresent ? "auto" : "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      className={styles("sencorp-sidebar-backdrop", sidebarBackdropClassName).className}
    />
  );
}
