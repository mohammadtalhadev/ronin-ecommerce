import IconPhone from '../../../assets/telephone.png'
import IconMail from '../../../assets/mail.png'

function ContactInfo() {
  return (
    <div>
      <p className="text-white font-bold text-[15px] mb-4">We&rsquo;re here to help.</p>
      <a
        href="tel:021111176646"
        className="flex items-center gap-3 text-[var(--footer-muted)] hover:text-white transition-colors duration-300 text-[15px] mb-3"
      >
        <img src={IconPhone} alt="" className="h-4 w-4 object-contain brightness-0 invert" />
        Call Us: 021 111 176 646
      </a>
      <a
        href="mailto:Support@ronin.pk"
        className="flex items-center gap-3 text-[var(--footer-muted)] hover:text-white transition-colors duration-300 text-[15px]"
      >
        <img src={IconMail} alt="" className="h-4 w-4 object-contain brightness-0 invert" />
        Email Us: Support@ronin.pk
      </a>
    </div>
  )
}

export default ContactInfo