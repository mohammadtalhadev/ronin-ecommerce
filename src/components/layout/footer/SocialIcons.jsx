import SocialFacebook from '../../../assets/svg-438.svg'
import SocialInstagram from '../../../assets/svg-437.svg'
import SocialYoutube from '../../../assets/svg-439.svg'
import SocialLinkedin from '../../../assets/svg-440.svg'

const socials = [
  { name: 'Facebook', src: SocialFacebook },
  { name: 'Instagram', src: SocialInstagram },
  { name: 'YouTube', src: SocialYoutube },
  { name: 'LinkedIn', src: SocialLinkedin },
]

function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <a
          key={social.name}
          href="#"
          aria-label={social.name}
          className="social-icon h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-white/90 transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5"
        >
          <img src={social.src} alt="" className="h-4 w-4 object-contain" />
        </a>
      ))}
    </div>
  )
}

export default SocialIcons