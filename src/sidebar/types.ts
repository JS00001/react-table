import type { HTMLMotionProps } from "motion/react";
import type { ComponentProps, ComponentType, CSSProperties, PropsWithChildren } from "react";

export type SidebarComponents = Record<string, ComponentType<any>>;

export type OpenSidebarArgs<Sidebars extends SidebarComponents> = {
  [Name in keyof Sidebars]: {} extends ComponentProps<Sidebars[Name]>
    ? [name: Name, props?: ComponentProps<Sidebars[Name]>]
    : [name: Name, props: ComponentProps<Sidebars[Name]>];
}[keyof Sidebars];

export type OpenSidebar<Sidebars extends SidebarComponents> = {
  [Name in keyof Sidebars]: {
    name: Name;
    props: ComponentProps<Sidebars[Name]>;
  };
}[keyof Sidebars];

export type SidebarProps = HTMLMotionProps<"aside">;

export type SidebarProviderProps<Sidebars extends SidebarComponents> = PropsWithChildren<{
  /** The sidebars that can be opened. */
  sidebars: Sidebars;
  /** The background color of the sidebar. */
  sidebarBackgroundColor?: CSSProperties["backgroundColor"];
  /** The background color of the backdrop. */
  sidebarBackdropColor?: CSSProperties["backgroundColor"];
}>;

export type SidebarContextType<Sidebars extends SidebarComponents> = {
  /** The background color of the sidebar */
  sidebarBackgroundColor: CSSProperties["backgroundColor"];
  /** The background color of the sidebar's backdrop */
  sidebarBackdropColor: CSSProperties["backgroundColor"];
  /** Open a sidebar with the given name and props */
  open: (...args: OpenSidebarArgs<Sidebars>) => void;
  /** Close a sidebar with the given name */
  close: (name: keyof Sidebars) => void;
  /** Close all sidebars */
  closeAll: () => void;
  /** Pop the last opened sidebar */
  pop: () => void;
};
