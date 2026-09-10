import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { MapPinIcon } from '../../components/ui/Icons'

// Addresses live on the user record (user.addresses[]) via updateProfile —
// mirroring how a backend would store them.
function AddressesPage() {
  const { user, updateProfile } = useAuth()
  const toast = useToast()
  const addresses = user.addresses ?? []

  const [showForm, setShowForm] = useState(false)
  const [values, setValues] = useState({ label: '', street: '', city: '', province: 'Punjab' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const next = {}
    if (!values.street.trim()) next.street = 'Street address is required.'
    if (!values.city.trim()) next.city = 'City is required.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      await updateProfile({
        addresses: [...addresses, { id: `adr_${Date.now()}`, ...values }],
      })
      setValues({ label: '', street: '', city: '', province: 'Punjab' })
      setShowForm(false)
      toast.success('Address saved.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (id) => {
    try {
      await updateProfile({ addresses: addresses.filter((a) => a.id !== id) })
      toast.info('Address removed.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Addresses</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            + Add address
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-6 space-y-4 rounded-2xl bg-gray-50 p-5" noValidate>
          <Input label="Label (e.g. Home, Office)" name="label" value={values.label} onChange={handleChange} />
          <Input label="Street address" name="street" value={values.street} onChange={handleChange} error={errors.street} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" name="city" value={values.city} onChange={handleChange} error={errors.city} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Province</label>
              <select
                name="province"
                value={values.province}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
              >
                {['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" loading={loading} variant="dark" className="flex-1">
              Save address
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-12 text-center">
          <span className="mb-3 text-slate-300"><MapPinIcon className="w-10 h-10" /></span>
          <p className="text-sm font-semibold text-slate-900">No saved addresses</p>
          <p className="mt-1 text-xs text-gray-500">Save an address for faster checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-2xl border border-gray-100 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {address.label || 'Address'}
                </span>
                <button
                  onClick={() => handleRemove(address.id)}
                  aria-label="Remove address"
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-slate-700">
                {address.street}, {address.city}, {address.province}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddressesPage
