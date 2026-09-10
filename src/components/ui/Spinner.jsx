function Spinner({ size = 'h-4 w-4' }) {
  return (
    <span
      className={`inline-block ${size} animate-spin rounded-full border-2 border-current border-t-transparent`}
      aria-hidden="true"
    />
  )
}

export default Spinner
