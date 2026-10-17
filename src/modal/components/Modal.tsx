import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import type { ModalProps } from "@/modal/types";

import { styles } from "@/util";
import useModal from "@/modal/hooks/useModal";

export default function Modal({ children, className }: ModalProps) {
  const { pop } = useModal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    event.stopPropagation();
    pop();
  };

  // Ensure that the modal is only rendered during client side rendering
  useEffect(() => {
    setContainer(document.body);
  }, []);

  if (!container) return null;

  return createPortal(
    <div className="sencorp-modal-backdrop" onClick={handleBackdropClick}>
      <div {...styles("sencorp-modal-content", className)} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>,
    container,
  );
}
