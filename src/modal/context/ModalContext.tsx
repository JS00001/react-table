import { createContext, PropsWithChildren, useContext } from "react";

type ModalContextType = {};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function ModalProvider({ children }: PropsWithChildren) {
  return <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>;
}

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
}
