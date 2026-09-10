import { CheckIcon, XMarkIcon, InfoIcon } from './Icons'

function Toast({ type = 'info', message, onClose }) {
  const styles = {
    success: { bg: 'bg-green-600', Icon: CheckIcon },
    error: { bg: 'bg-red-600', Icon: XMarkIcon },
    info: { bg: 'bg-slate-900', Icon: InfoIcon },
  }[type]
  const { bg, Icon } = styles

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-center gap-3 rounded-xl ${bg} px-4 py-3 text-white shadow-xl animate-toast-in`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
        <Icon className="h-3 w-3" />
      </span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="ml-2 text-white/70 hover:text-white transition"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Toast
