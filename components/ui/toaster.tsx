// Toast container component
// Manages toast notifications with motion animations

"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toast } from "./toast";
import type { ToastProps } from "./toast";

interface ToastWithId extends ToastProps {
  id: string;
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, "id">) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within Toaster");
  }
  return context;
}

interface ToasterProps {
  children?: React.ReactNode;
}

export function Toaster({ children }: ToasterProps) {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);
  const toastIdCounterRef = { current: 0 };

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((props: Omit<ToastProps, "id">) => {
    const id = `toast-${toastIdCounterRef.current++}`;
    const toast: ToastWithId = { ...props, id };
    setToasts((prev) => [...prev, toast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);

    return id;
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children ?? null}
      <div className="pointer-events-none fixed bottom-0 z-[100] flex w-full flex-col gap-2 p-4 sm:right-0 sm:bottom-0 sm:top-auto sm:left-auto sm:w-[420px]">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <Toast
                {...toast}
                onClose={() => removeToast(toast.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// Export toast function for global use
export function toast(props: Omit<ToastProps, "id">) {
  // This will be set by Toaster component
  console.warn("toast() called outside Toaster context. Use useToast() hook instead.");
  return "";
}
