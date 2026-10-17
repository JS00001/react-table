import { createContext, useCallback, useEffect, useState } from "react";

import type {
  ModalComponents,
  ModalContextType,
  ModalProviderProps,
  OpenModal,
  OpenModalArgs,
  OpenModals,
} from "@/modal/types";

export const ModalContext = createContext<ModalContextType<ModalComponents> | undefined>(undefined);

export default function ModalProvider<Modals extends ModalComponents>({ children, modals }: ModalProviderProps<Modals>) {
  const [openModals, setOpenModals] = useState<OpenModals<Modals>>([]);

  const hasOpenModals = openModals.length > 0;

  const open = (...args: OpenModalArgs<Modals>) => {
    const [name, props] = args;

    if (!Object.prototype.hasOwnProperty.call(modals, name)) {
      throw new Error(`Unknown modal: ${String(name)}`);
    }

    const modal = { name, props: props ?? {} } as OpenModal<Modals>;
    setOpenModals((current) => [...current.filter((item) => item.name !== name), modal]);
  };

  const close = (name: keyof Modals) => {
    setOpenModals((current) => current.filter((modal) => modal.name !== name));
  };

  const closeAll = () => {
    setOpenModals([]);
  };

  const pop = useCallback(() => {
    setOpenModals((current) => current.slice(0, -1));
  }, []);

  useEffect(() => {
    if (!hasOpenModals) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || event.repeat) return;
      event.preventDefault();
      pop();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasOpenModals, pop]);

  const context: ModalContextType<Modals> = {
    open,
    close,
    closeAll,
    pop,
  };

  return (
    <ModalContext.Provider value={context as unknown as ModalContextType<ModalComponents>}>
      {children}

      {openModals.map(({ name, props }) => {
        const Component: ModalComponents[string] = modals[name];
        if (!Component) return null;
        return <Component key={String(name)} {...props} />;
      })}
    </ModalContext.Provider>
  );
}
