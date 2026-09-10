import EmailArrow from '../../../assets/svg-441.svg'

function Newsletter() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-white font-bold text-[15px] mb-4">Get exclusive offers and updates.</p>
      <div className="flex items-center w-full max-w-[470px] min-w-0 h-[60px] md:h-[68px] border border-white/50 rounded-full pl-6 pr-1.5 focus-within:border-white transition-colors duration-300">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Email address"
          className="flex-1 min-w-0 bg-transparent outline-none text-white text-[15px] placeholder:text-[var(--footer-muted)]"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="shrink-0 w-11 h-11 md:w-[52px] md:h-[52px] rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
          <img src={EmailArrow} alt="" className="h-5 w-5 object-contain" />
        </button>
      </div>
    </form>
  )
}

export default Newsletter