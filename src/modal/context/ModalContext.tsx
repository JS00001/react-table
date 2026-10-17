import { createContext, useState } from "react";

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

  const pop = () => {
    setOpenModals((current) => current.slice(0, -1));
  };

  const closeAll = () => {
    setOpenModals([]);
  };

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
