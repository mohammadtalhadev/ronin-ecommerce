import { Link } from 'react-router-dom'

function FooterColumn({ title, columns }) {
  const isMulti = columns.length > 1

  return (
    <div>
      <h5 className="mb-4 text-white font-bold text-base md:text-lg tracking-wide uppercase">
        {title}
      </h5>
      <nav
        aria-label={title}
        className={isMulti ? 'flex gap-8 md:gap-12' : ''}
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