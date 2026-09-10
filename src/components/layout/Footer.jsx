import { Link } from 'react-router-dom'
import RoninLogo from '../../assets/ronin-logo_alt_1-1.png'
import { footerColumns } from '../../data/footerLinks'
import FooterColumn from './footer/FooterColumn'
import SocialIcons from './footer/SocialIcons'
import ContactInfo from './footer/ContactInfo'
import Newsletter from './footer/Newsletter'
import PaymentMethods from './footer/PaymentMethods'
import BackToTop from './footer/BackToTop'

function Footer() {
  return (
    <>
      <footer
        className="group-block mx-2 md:mx-6"
        aria-label="Site footer"
      >
        <div className="group-block-content flex-col md:flex-row md:items-start">
          <div className="grid grid-cols-2 gap-6 w-full md:grid-cols-2 xl:grid-cols-4 md:gap-8 xl:gap-10">
            {footerColumns.map((section) => (
              <FooterColumn key={section.title} title={section.title} columns={section.columns} />
            ))}

            <div className="min-w-0 col-span-2 md:col-span-1">
              <Link to="/" aria-label="Ronin - Home" title="Ronin - Home" className="inline-block">
                <img
                  src={RoninLogo}
                  alt="Ronin"
                  className="w-[90px] h-auto object-contain mb-3 md:w-[160px] md:mb-4"
                />
              </Link>
              <SocialIcons />
              <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                <ContactInfo />
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-[var(--footer-bottom-bg, #F4F4F4)] border-t border-gray-200">
        <div className="mx-2 md:mx-6 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 md:py-5">
          <p className="text-gray-500 text-xs text-center md:text-sm md:text-left">© 2026 Ronin. All Rights Reserved</p>
          <PaymentMethods />
        </div>
      </div>

      <BackToTop />
    </>
  )
}

export default Footer

