function NavIconWithMenu({ icon, label, isActive, onHover, onToggle }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={isActive}
      aria-label={`Browse ${label} collections`}
      className={`group flex items-center  gap-1.5 px-2.5 py-2 rounded-full cursor-pointer transition ${
        isActive ? 'bg-white/25' : 'hover:bg-white/20'
      }`}
      onMouseEnter={() => onHover(label)}
      onClick={() => onToggle(label)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(label)
        }
      }}
    >
      <img src={icon} alt={label} className="w-7 h-6 object-contain shrink-0"
      style={{ filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.3))' }} />
      <span
        className="text-xs font-medium hidden group-hover:inline whitespace-nowrap"
        style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.4)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default NavIconWithMenu