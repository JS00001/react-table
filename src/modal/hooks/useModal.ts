import { useContext } from "react";

import { ModalContext } from "@/modal/context/ModalContext";
import type { ModalComponents, ModalContextType } from "@/modal/types";

export default function useModal<Modals extends ModalComponents>() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  // The app's wrapper supplies its modal component map for typed calls.
  return context as unknown as ModalContextType<Modals>;
}
