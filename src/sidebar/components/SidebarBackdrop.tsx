import { motion, useIsPresent } from "motion/react";

import useSidebar from "@/sidebar/hooks/useSidebar";

export default function SidebarBackdrop() {
  const isPresent = useIsPresent();
  const { sidebarBackdropColor, pop } = useSidebar();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !isPresent) return;
    event.stopPropagation();
    pop();
  };

  return (
    <motion.div
      className="sencorp-sidebar-backdrop"
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
    />
  );
}
