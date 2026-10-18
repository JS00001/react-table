import type { ReactNode } from "react";
import type { ToastOptions } from "@/toast/types";

type ActiveToast = {
  id: number;
  content: ReactNode;
  options: ToastOptions;
};

let nextId = 0;
let activeToast: ActiveToast | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const toast = {
  show(content: ReactNode, options: ToastOptions = {}) {
    activeToast = { id: ++nextId, content, options };
    notify();
  },
  close() {
    activeToast = null;
    notify();
  },
};

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return activeToast;
}

export function getServerSnapshot() {
  return null;
}
