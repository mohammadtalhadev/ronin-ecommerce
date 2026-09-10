/* eslint-disable react-refresh/only-export-components -- context object + provider live together by design */
import { createContext, useState, useCallback, useMemo, useRef } from 'react'
import Toast from '../components/ui/Toast'

// One centralized toast system for the whole app (success/error/info).
// Usage: const toast = useToast(); toast.success('Saved!'); toast.error('Oops')

export const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idCounter = useRef(0)

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message, type = 'info', duration = 3500) => {
      const id = ++idCounter.current
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), duration)
      return id
    },
    [removeToast]
  )

  const toast = useMemo(
    () => ({
      success: (msg, duration) => addToast(msg, 'success', duration),
      error: (msg, duration) => addToast(msg, 'error', duration),
      info: (msg, duration) => addToast(msg, 'info', duration),
    }),
    [addToast]
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Fixed-position stack, top-right, above everything else */}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
