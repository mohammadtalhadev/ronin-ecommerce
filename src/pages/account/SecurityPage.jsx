import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { isValidPassword } from '../../utils/validators'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

function SecurityPage() {
  const { changePassword, logout } = useAuth()
  const toast = useToast()

  const [values, setValues] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!values.current) next.current = 'Current password is required.'
    if (!values.next) next.next = 'New password is required.'
    else if (!isValidPassword(values.next)) next.next = 'Password must be at least 6 characters.'
    else if (values.next === values.current) next.next = 'New password must be different.'
    if (values.next !== values.confirm) next.confirm = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      await changePassword(values.current, values.next)
      toast.success('Password changed. Please log in again.')
      logout()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Security</h2>
      <p className="mb-6 text-sm text-gray-500">
        Change your password. You&apos;ll be logged out and asked to sign in again afterwards.
      </p>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4" noValidate>
        <Input
          label="Current password"
          name="current"
          type="password"
          autoComplete="current-password"
          value={values.current}
          onChange={handleChange}
          error={errors.current}
        />
        <Input
          label="New password"
          name="next"
          type="password"
          autoComplete="new-password"
          value={values.next}
          onChange={handleChange}
          error={errors.next}
        />
        <Input
          label="Confirm new password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={values.confirm}
          onChange={handleChange}
          error={errors.confirm}
        />
        <Button type="submit" loading={loading} variant="dark">
          {loading ? 'Updating…' : 'Change password'}
        </Button>
      </form>
    </div>
  )
}

export default SecurityPage
