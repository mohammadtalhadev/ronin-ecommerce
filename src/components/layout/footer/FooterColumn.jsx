import { useState } from 'react'
import { Link } from 'react-router-dom'

function FooterColumn({ title, columns }) {
  const [isOpen, setIsOpen] = useState(false)
  const isMulti = columns.length > 1

  return (
    <div>
      {/* Mobile: clickable accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4 md:mb-4 text-white font-bold text-base md:text-lg tracking-wide uppercase md:pointer-events-none"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {/* Chevron — visible on mobile only */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Links — hidden on mobile when collapsed, always visible on md+ */}
      <nav
        aria-label={title}
        className={`${isMulti ? 'flex gap-8 md:gap-12' : ''} ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        {columns.map((subColumn, subIndex) => (
          <ul key={subIndex} className="space-y-2 md:space-y-2.5">
            {subColumn.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className="footer-link text-[13px] md:text-[14px] font-normal leading-[22px] text-[var(--footer-muted)] hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    className="text-[13px] md:text-[14px] font-normal leading-[22px] text-[var(--footer-muted)] hover:text-white transition-colors duration-300 cursor-default"
                  >
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </div>
  )
}

export default FooterColumn