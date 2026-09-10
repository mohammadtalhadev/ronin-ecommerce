// Shared form validation. Used by both Login and Signup so the rules
// live in exactly one place.

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidName(name) {
  return name.trim().length >= 2 && name.trim().length <= 60
}

export function isValidPhone(phone) {
  // Optional field: empty is fine, otherwise must look like a phone number
  if (!phone.trim()) return true
  return /^[+\d][\d\s\-()]{7,16}$/.test(phone.trim())
}

export function isValidPassword(password) {
  return password.length >= 6
}

export function passwordStrength(password) {
  if (!password) return null
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/5' }
  if (score <= 3) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-3/5' }
  return { label: 'Strong', color: 'bg-green-500', width: 'w-full' }
}

export function validateSignupForm(values) {
  const errors = {}
  if (!isValidName(values.name)) errors.name = 'Please enter your full name.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email address.'
  if (!isValidPhone(values.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!values.password) errors.password = 'Password is required.'
  else if (!isValidPassword(values.password)) errors.password = 'Password must be at least 6 characters.'
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }
  return errors
}

export function validateProfileForm(values) {
  const errors = {}
  if (!isValidName(values.name)) errors.name = 'Please enter your full name.'
  if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email address.'
  if (!isValidPhone(values.phone)) errors.phone = 'Please enter a valid phone number.'
  return errors
}
