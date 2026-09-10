import { Component } from 'react'
import { AlertIcon, RefreshIcon } from '../ui/Icons'

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state?.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#F0F0F0] px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertIcon className="h-7 w-7" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-gray-600">
            An unexpected error occurred while rendering this page. You can retry or return to the homepage.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <RefreshIcon className="h-4 w-4" />
              Retry
            </button>
            <button
              onClick={() => { window.location.href = '/' }}
              className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
            >
              Go home
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary