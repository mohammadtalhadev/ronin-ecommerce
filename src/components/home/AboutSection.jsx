import { useState } from 'react'

function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const shortText = "Welcome to Ronin, Pakistan's trusted name for innovative smart wearable and tech accessories. Our mission? To bring cutting-edge technology to your fingertips—without breaking the bank."

  const fullText = shortText + " Whether you're a fitness enthusiast, a music lover, or someone who just wants to get tailored to you. Discover why Ronin is the number one choice for smart wearable & tech accessories in Pakistan."

  return (
    <section data-reveal className="px-8 py-12 max-w-4xl mx-auto text-center">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Ronin - A Globally Accredited Smart Wearable & Tech Accessories Brand
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed">
        {isExpanded ? fullText : shortText}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-orange-500 text-sm font-semibold mt-3 hover:underline"
      >
        {isExpanded ? "Read Less -" : "Read More +"}
      </button>
    </section>
  )
}

export default AboutSection