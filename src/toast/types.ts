import type { HTMLMotionProps } from "motion/react";
import type { PropsWithChildren, ReactNode } from "react";

export type ToastProps = HTMLMotionProps<"div">;

export type ToastOptions = {
  /** Milliseconds before dismissal. Set to 0 to keep the toast open. */
  duration?: number;
  /** Additional className to apply to the toast. */
  className?: string;
  /** Additional style to apply to the toast. */
  style?: ToastProps["style"];
};

export type ToastProviderProps = PropsWithChildren<{
  /** Milliseconds before dismissal. Set to 0 to keep the toast open. */
  duration?: number;
  /** Additional className to apply to the toast. */
  toastClassName?: string;
  /** Additional style to apply to the toast. */
  toastStyle?: ToastProps["style"];
}>;

export type ToastContextType = {
  open: (content: ReactNode, options?: ToastOptions) => void;
  close: () => void;
};
