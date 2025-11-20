import { createContext, useContext, useState, type ReactNode } from "react";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [removing, setRemoving] = useState<number[]>([]);

  function showToast(message: string, type: ToastType = "success") {
    const id = Date.now();

    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setRemoving(prev => [...prev, id]);

      // REMOVE FROM DOM AFTER ANIMATION
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
        setRemoving(prev => prev.filter(r => r !== id));
      }, 250); // same duration as animation
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              px-5 py-3 rounded-2xl shadow-lg backdrop-blur-md
              text-sm font-semibold animate-slide-up
              ${toast.type === "success"
                ? "bg-success text-white"
                : "bg-danger text-white"
              }
              dark:${toast.type === "success"
                ? "bg-success"
                : "bg-danger"
              }
              ${removing.includes(toast.id)
                ? "animate-toast-exit"
                : "animate-toast-enter"
              }
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Animación*/}
      <style>{`
        @keyframes toast-enter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes toast-exit {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
        }

        .animate-toast-enter {
          animation: toast-enter 0.25s ease-out forwards;
        }

        .animate-toast-exit {
          animation: toast-exit 0.25s ease-in forwards;
        }
      `}</style>

    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
