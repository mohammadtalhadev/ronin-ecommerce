import PersonalizedImg from '../../assets/Personalized_Printing_converted.avif'
import { Link } from 'react-router-dom'

function PersonalizedBanner() {
  return (
    <section data-reveal className="px-8 py-6">
      <div className="relative rounded-3xl overflow-hidden bg-gray-100">
        <img
          src={PersonalizedImg}
          alt="Personalized Banner"
          className="w-full h-auto object-cover rounded-3xl"
        />

        <Link
          to="/collections/personalized"
          className="absolute inset-0 z-[2]"
          aria-label="Shop Personalized Collection"
        />
      </div>
    </section>
  )
}

export default PersonalizedBanner