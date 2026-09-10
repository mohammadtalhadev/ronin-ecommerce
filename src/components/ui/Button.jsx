import Spinner from './Spinner'

// Reusable button with built-in loading state. Loading is driven by
// real async work (no artificial delays) — the spinner shows exactly
// while the promise is in flight.
function Button({ children, loading = false, variant = 'primary', className = '', disabled, ...props }) {
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white',
    outline: 'border border-slate-300 hover:border-slate-900 text-slate-900 bg-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

export default Button
