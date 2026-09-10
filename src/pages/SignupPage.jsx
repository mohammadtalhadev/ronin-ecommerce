import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { validateSignupForm, passwordStrength } from '../utils/validators'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import RoninLogo from '../assets/ronin-logo_alt_1-1.png'

function SignupPage() {
  const { signup } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [loading, setLoading] = useState(false)

  const strength = passwordStrength(values.password)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validateSignupForm(values)
    if (!values.agreeTerms) nextErrors.agreeTerms = 'Please accept the terms to continue.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      const user = await signup({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      toast.success(`Account created. Welcome, ${user.name.split(' ')[0]}!`)
      navigate('/', { replace: true })
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
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign up for faster checkout and order tracking.
          </p>
        </div>

        {formError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input label="Full name" name="name" autoComplete="name" placeholder="Ali Khan" value={values.name} onChange={handleChange} error={errors.name} />
          <Input label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={handleChange} error={errors.email} />
          <Input label="Phone (optional)" name="phone" type="tel" autoComplete="tel" placeholder="+92 300 1234567" value={values.phone} onChange={handleChange} error={errors.phone} />

          <div>
            <Input label="Password" name="password" type="password" autoComplete="new-password" placeholder="At least 6 characters" value={values.password} onChange={handleChange} error={errors.password} />
            {strength && !errors.password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
                </div>
                <span className="text-xs font-medium text-gray-500">{strength.label}</span>
              </div>
            )}
          </div>

          <Input label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Re-enter your password" value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          <div>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" name="agreeTerms" checked={values.agreeTerms} onChange={handleChange} className="mt-0.5 h-4 w-4 accent-orange-500" />
              <span>
                I agree to the <span className="font-semibold text-orange-500">Terms &amp; Conditions</span> and{' '}
                <span className="font-semibold text-orange-500">Privacy Policy</span>
              </span>
            </label>
            {errors.agreeTerms && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.agreeTerms}</p>}
          </div>

          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-orange-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
