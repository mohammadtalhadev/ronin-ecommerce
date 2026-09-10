import { useState, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { validateProfileForm } from '../../utils/validators'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const toast = useToast()
  const fileInputRef = useRef(null)

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone ?? '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Read as base64 data URL — demo-sized images only
    if (file.size > 500 * 1024) {
      toast.error('Please choose an image under 500 KB.')
      return
    }
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        await updateProfile({ avatar: reader.result })
        toast.success('Profile photo updated.')
      } catch (err) {
        toast.error(err.message)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validateProfileForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      await updateProfile(values)
      toast.success('Profile updated.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-slate-900">Profile</h2>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
              {user.name?.trim()?.charAt(0)?.toUpperCase() ?? 'U'}
            </span>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-900 hover:border-slate-900"
            >
              Change photo
            </button>
            <p className="mt-1 text-xs text-gray-400">JPG or PNG, max 500 KB</p>
          </div>
        </div>

        <Input label="Full name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <Input label="Email address" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <Input label="Phone" name="phone" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} />

        <Button type="submit" loading={loading} variant="dark">
          {loading ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </div>
  )
}

export default ProfilePage
