import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { createContext, useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";
import type { ToastContextType, ToastOptions, ToastProviderProps } from "@/toast/types";

import { styles } from "@/util";
import Toast from "@/toast/components/Toast";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ActiveToast = {
  id: number;
  content: ReactNode;
  options: ToastOptions;
};

export default function ToastProvider({ children, duration = 4000, toastClassName, toastStyle }: ToastProviderProps) {
  const nextId = useRef(0);
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const open = (content: ReactNode, options: ToastOptions = {}) => {
    setToast({ id: ++nextId.current, content, options });
  };

  const close = () => {
    setToast(null);
  };

  useEffect(() => {
    setContainer(document.body);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = toast.options.duration ?? duration;
    if (timeout <= 0) return;

    const timer = window.setTimeout(() => {
      setToast((current) => (current?.id === toast.id ? null : current));
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [toast, duration]);

  return (
    <ToastContext.Provider value={{ open, close }}>
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
