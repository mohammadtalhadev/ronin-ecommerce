import { ambassadors } from '../../data/ambassadors'
import heartIcon from '../../assets/heart-outline.svg'
import commentIcon from '../../assets/comment-outline.svg'

function BrandAmbassadors() {
  const doubledAmbassadors = [...ambassadors, ...ambassadors]

  return (
    <section data-reveal className="overflow-hidden">
      <div className="relative text-center mb-6 px-3 pt-6 sm:mb-10 sm:px-8 sm:pt-12">
        <h2 className="font-script text-4xl leading-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-red-500 bg-clip-text text-transparent sm:text-6xl md:text-7xl lg:text-[46px]">
          Brand Ambassadors
        </h2>
      </div>

      <div className="pb-10 overflow-hidden sm:pb-[60px] md:pb-[80px]">
        <div className="grid grid-flow-col auto-cols-[260px] grid-rows-2 gap-4 h-[420px] w-max animate-marquee">
          {doubledAmbassadors.map((person, index) => (
            <div
              key={`${person.id}-${index}`}
              className={`relative rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.08)] ${
                person.fullHeight ? 'row-span-2' : 'row-span-1'
              }`}
            >
              {person.showProfileCard ? (
                <div className="relative bg-white h-full flex flex-col items-center justify-center gap-2 p-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    width={64}
                    height={64}
                    loading={index < 5 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="relative z-10 w-16 h-16 rounded-full object-cover"
                  />
                  <p className="relative z-10 text-base md:text-lg font-semibold text-slate-800">
                    {person.name}
                  </p>
                  <p className="relative z-10 text-xs text-gray-500">#{person.role}</p>
                  <div className="relative z-10 flex items-center gap-2 mt-1">
                    <img src={heartIcon} alt="" aria-hidden="true" width={18} height={18} className="w-[18px] h-[18px]" />
                    <img src={commentIcon} alt="" aria-hidden="true" width={18} height={18} className="w-[18px] h-[18px]" />
                  </div>
                </div>
              ) : (
                <img
                  src={person.image}
                  alt={person.name}
                  loading={index < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchpriority={index < 3 ? 'high' : 'auto'}
                  className="w-full h-full object-cover"
                />
              )}

              {person.link && (
                <a
                  href={person.link}
                  className="block absolute inset-0 font-sans text-sm leading-relaxed text-[#464646] cursor-pointer z-20"
                  aria-label={`Shop the product ${person.name || 'featured here'} promotes`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandAmbassadors