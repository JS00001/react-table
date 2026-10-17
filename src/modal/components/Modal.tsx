import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";

import { styles } from "@/util";
import useModal from "@/modal/hooks/useModal";

type ModalProps = React.HTMLAttributes<HTMLDivElement>;

export default function Modal({ children, className, style, ...props }: ModalProps) {
  const { pop, modalBackgroundColor, modalBackdropColor } = useModal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    event.stopPropagation();
    pop();
  };

  const modalStyles = styles("sencorp-modal-content", { backgroundColor: modalBackgroundColor }, className, style);

  // Ensure that the modal is only rendered during client side rendering
  useEffect(() => {
    setContainer(document.body);
  }, []);

  if (!container) return null;

  return createPortal(
    <div className="sencorp-modal-backdrop" style={{ backgroundColor: modalBackdropColor }} onClick={handleBackdropClick}>
      <div role="dialog" aria-modal="true" className={modalStyles.className} style={modalStyles.style} {...props}>
        {children}
      </div>
    </div>,
    container,
  );
}
