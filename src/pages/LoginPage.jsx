import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { isValidEmail } from '../utils/validators'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import RoninLogo from '../assets/ronin-logo_alt_1-1.png'

function LoginPage() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [values, setValues] = useState({ email: '', password: '', rememberMe: true })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!values.email.trim()) nextErrors.email = 'Email is required.'
    else if (!isValidEmail(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!values.password) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      const user = await login(values.email, values.password, {
        rememberMe: values.rememberMe,
      })
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      // Honor the intended destination, e.g. ?redirect=/checkout
      navigate(searchParams.get('redirect') || '/', { replace: true })
    } catch (err) {
      setFormError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20 bg-[#F0F0F0]">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={RoninLogo} alt="Ronin" className="mb-4 h-8 w-auto object-contain" />
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Log in to your Ronin account to continue shopping.
          </p>
        </div>

        {formError && (
          <div
            role="alert"
            className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700"
          >
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 accent-orange-500"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => toast.info('Password reset needs a backend — coming with the database!')}
              className="text-sm font-semibold text-orange-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Logging in…' : 'Log in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-orange-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
