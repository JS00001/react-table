import type { ComponentProps, ComponentType, CSSProperties, PropsWithChildren } from "react";

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

export type ModalProviderProps<Modals extends ModalComponents> = PropsWithChildren<{
  /** The modal components that can be opened. */
  modals: Modals;
  /** The background color of the modal content. */
  modalBackgroundColor?: CSSProperties["backgroundColor"];
  /** The background color of the modal backdrop. */
  modalBackdropColor?: CSSProperties["backgroundColor"];
}>;

export type ModalProps = PropsWithChildren<{
  className?: string;
}>;

export type ModalContextType<Modals extends ModalComponents> = {
  /** The background color of the modal content. */
  modalBackgroundColor: CSSProperties["backgroundColor"];
  /** The background color of the modal backdrop. */
  modalBackdropColor: CSSProperties["backgroundColor"];
  /** Opens a modal with the given name and props. */
  open: (...args: OpenModalArgs<Modals>) => void;
  /** Closes a modal with the given name. */
  close: (name: keyof Modals) => void;
  /** Closes all open modals. */
  closeAll: () => void;
  /** Closes the most recently opened modal. */
  pop: () => void;
};
