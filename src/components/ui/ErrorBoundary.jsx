import { Component } from 'react'
import { BoltIcon } from './Icons'

// Keeps a runtime error in one page (e.g. ProductPage) from blanking the
// entire application. Wraps the routed content in App.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Hook a reporting service (e.g. Sentry) here when the backend lands
    console.error('Unhandled UI error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 text-red-500"><BoltIcon className="w-14 h-14" /></span>
          <h1 className="mb-2 text-2xl font-bold text-slate-900">Something went wrong</h1>
          <p className="mb-6 max-w-md text-sm text-gray-500">
            An unexpected error occurred while rendering this page. You can try reloading the
            section below.
          </p>
          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:border-slate-900"
            >
              Go home
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
