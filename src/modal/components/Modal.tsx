import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, useIsPresent } from "motion/react";

import type { MouseEvent } from "react";
import type { ModalProps } from "@/modal/types";

import { styles } from "@/util";
import useModal from "@/modal/hooks/useModal";

export default function Modal({ children, className, style, ...props }: ModalProps) {
  const isPresent = useIsPresent();
  const { pop, modalBackgroundColor, modalBackdropColor } = useModal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !isPresent) return;
    event.stopPropagation();
    pop();
  };

  const backdropStyles = styles({
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: modalBackdropColor,
    pointerEvents: isPresent ? "auto" : "none",
  });

  useEffect(() => {
    setContainer(document.body);
  }, []);

  if (!container) return null;

  return createPortal(
    <motion.div
      className="sencorp-modal-backdrop"
      style={backdropStyles.style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        {...props}
        className={styles("sencorp-modal-content", className).className}
        style={{ backgroundColor: modalBackgroundColor, ...style }}
      >
        {children}
      </motion.div>
    </motion.div>,
    container,
  );
}
