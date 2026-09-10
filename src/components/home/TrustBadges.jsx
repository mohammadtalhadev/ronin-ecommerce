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
    <section data-reveal className="px-8 py-6">
      <div className="bg-white rounded-full shadow flex items-center justify-between px-10 py-6 flex-wrap gap-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-red-500 bg-clip-text text-transparent">
          Exceptional Quality Delivered
        </h2>

        <div className="flex items-center gap-10 flex-wrap">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3">
              <img src={badge.image} alt={badge.title} className="h-14 w-14 object-contain" />
              <div className="text-sm text-gray-600 leading-tight">
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