import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { createContext, useEffect, useState, useSyncExternalStore } from "react";

import type { ToastContextType, ToastProviderProps } from "@/toast/types";

import { styles } from "@/util";
import Toast from "@/toast/components/Toast";
import { getServerSnapshot, getSnapshot, subscribe, toast as toastController } from "@/toast/store";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children, duration = 4000, toastClassName, toastStyle }: ToastProviderProps) {
  const toast = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.body);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = toast.options.duration ?? duration;
    if (timeout <= 0) return;

    const timer = window.setTimeout(() => {
      if (getSnapshot()?.id === toast.id) toastController.close();
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [toast, duration]);

  return (
    <ToastContext.Provider value={{ open: toastController.show, close: toastController.close }}>
      {children}
      {container &&
        createPortal(
          <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 1100, display: "grid", pointerEvents: "none" }}>
            <AnimatePresence>
              {toast && (
                <Toast
                  key={toast.id}
                  className={styles(toastClassName, toast.options.className).className}
                  style={{ ...toastStyle, ...toast.options.style, gridArea: "1 / 1", zIndex: toast.id }}
                >
                  {toast.content}
                </Toast>
              )}
            </AnimatePresence>
          </div>,
          container,
        )}
    </ToastContext.Provider>
  );
}
