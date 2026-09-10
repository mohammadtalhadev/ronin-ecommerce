import FreeDelivery from '../../assets/anim-icons-free-delivery2-unscreen.gif'
import SatisfiedCustomer from '../../assets/anim-icons-satisfied-customer-unscreen.gif'
import Warranty from '../../assets/anim-icons-warrenty.gif'
import Certified from '../../assets/anim-icons-certified.gif'

function TrustBadges() {
  const badges = [
    { image: FreeDelivery, title: "Free Shipping", subtitle: "Nationwide" },
    { image: SatisfiedCustomer, title: "70M+Satisfied", subtitle: "Customer" },
    { image: Warranty, title: "365 Days", subtitle: "Warranty" },
    { image: Certified, title: "Certified", subtitle: "Products" },
  ]

  return (
    <section data-reveal className="px-3 py-4 sm:px-8 sm:py-6">
      <div className="bg-white rounded-2xl shadow flex flex-col items-center gap-4 px-4 py-4 text-center sm:rounded-full sm:flex-row sm:justify-between sm:px-10 sm:py-6 sm:flex-wrap sm:gap-6 sm:text-left">
        <h2 className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-red-500 bg-clip-text text-transparent sm:text-2xl">
          Exceptional Quality Delivered
        </h2>

        <div className="flex items-center gap-6 flex-wrap justify-center sm:gap-10">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              <img src={badge.image} alt={badge.title} className="h-10 w-10 object-contain sm:h-14 sm:w-14" />
              <div className="text-xs text-gray-600 leading-tight sm:text-sm">
                <p>{badge.title}</p>
                <p>{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges