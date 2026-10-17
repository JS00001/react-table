import { useContext } from "react";

import { SidebarContext } from "@/sidebar/context/SidebarContext";
import type { SidebarComponents, SidebarContextType } from "@/sidebar/types";

export default function useSidebar<Sidebars extends SidebarComponents>() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context as unknown as SidebarContextType<Sidebars>;
}
