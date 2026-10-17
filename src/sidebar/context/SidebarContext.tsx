import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { createContext, useCallback, useEffect, useState } from "react";

import SidebarBackdrop from "@/sidebar/components/SidebarBackdrop";

import type {
  OpenSidebar,
  OpenSidebarArgs,
  SidebarComponents,
  SidebarContextType,
  SidebarProviderProps,
} from "@/sidebar/types";

export const SidebarContext = createContext<SidebarContextType<SidebarComponents> | undefined>(undefined);

export default function SidebarProvider<Sidebars extends SidebarComponents>({
  children,
  sidebars,
  sidebarBackgroundColor = "#ffffff",
  sidebarBackdropColor = "rgb(0 0 0 / 50%)",
}: SidebarProviderProps<Sidebars>) {
  const [entries, setEntries] = useState<OpenSidebar<Sidebars>[]>([]);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const hasOpenSidebars = entries.length > 0;

  // Ensure we're running in the client
  useEffect(() => {
    setContainer(document.body);
  }, []);

  const open = (...args: OpenSidebarArgs<Sidebars>) => {
    const [name, props] = args;

    if (!Object.prototype.hasOwnProperty.call(sidebars, name)) {
      throw new Error(`Unknown sidebar: ${String(name)}`);
    }

    const entry = { name, props: props ?? {} } as OpenSidebar<Sidebars>;
    setEntries((current) => [...current.filter((item) => item.name !== name), entry]);
  };

  const close = (name: keyof Sidebars) => {
    setEntries((current) => current.filter((entry) => entry.name !== name));
  };

  const closeAll = () => {
    setEntries([]);
  };

  const pop = useCallback(() => {
    setEntries((current) => current.slice(0, -1));
  }, []);

  useEffect(() => {
    if (!hasOpenSidebars) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || event.repeat) return;
      event.preventDefault();
      pop();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasOpenSidebars, pop]);

  const context: SidebarContextType<Sidebars> = {
    sidebarBackgroundColor,
    sidebarBackdropColor,
    open,
    close,
    closeAll,
    pop,
  };

  return (
    <SidebarContext.Provider value={context as unknown as SidebarContextType<SidebarComponents>}>
      {children}

      {container &&
        createPortal(
          <div className="sencorp-sidebar-stack" style={{ position: "fixed", inset: 0, zIndex: 900, pointerEvents: "none" }}>
            <AnimatePresence>
              {hasOpenSidebars && <SidebarBackdrop key="sidebar-backdrop" />}
              {entries.map(({ name, props }) => {
                const Component: SidebarComponents[string] = sidebars[name];
                if (!Component) return null;
                return <Component key={`sidebar:${String(name)}`} {...props} />;
              })}
            </AnimatePresence>
          </div>,
          container,
        )}
    </SidebarContext.Provider>
  );
}
