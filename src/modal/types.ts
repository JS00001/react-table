import type { ComponentProps, ComponentType, PropsWithChildren } from "react";

// Each component can declare its own props; the generic hook preserves them.
export type ModalComponents = Record<string, ComponentType<any>>;

export type OpenModalArgs<Modals extends ModalComponents> = {
  [Name in keyof Modals]: {} extends ComponentProps<Modals[Name]>
    ? [name: Name, props?: ComponentProps<Modals[Name]>]
    : [name: Name, props: ComponentProps<Modals[Name]>];
}[keyof Modals];

export type OpenModal<Modals extends ModalComponents> = {
  [Name in keyof Modals]: {
    name: Name;
    props: ComponentProps<Modals[Name]>;
  };
}[keyof Modals];

export type OpenModals<Modals extends ModalComponents> = OpenModal<Modals>[];

export type ModalContextType<Modals extends ModalComponents> = {
  open: (...args: OpenModalArgs<Modals>) => void;
  close: (name: keyof Modals) => void;
  closeAll: () => void;
  pop: () => void;
  openModals: OpenModals<Modals>;
};

export type ModalProviderProps<Modals extends ModalComponents> = PropsWithChildren<{
  modals: Modals;
}>;

export type ModalProps = PropsWithChildren<{
  className?: string;
}>;
