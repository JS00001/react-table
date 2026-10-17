import type { ModalProps } from "@/modal/types";

import { styles } from "@/util";

export default function Modal({ children, className }: ModalProps) {
  return (
    <div className="sencorp-modal-backdrop">
      <div {...styles("sencorp-modal-content", className)} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}
