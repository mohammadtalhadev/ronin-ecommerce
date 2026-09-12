import { useState } from 'react'
import { MapPinIcon } from '../components/ui/Icons'

function TrackOrderPage() {
  const [activeTab, setActiveTab] = useState('order')
  const [orderNumber, setOrderNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    // Track logic placeholder
  }

  return (
    <div className="pt-14 md:pt-18 bg-[#F0F0F0]">
      {/* Hero section */}
      <section className="relative overflow-hidden rounded-b-3xl md:rounded-b-[40px] bg-gradient-to-br from-[#0a1a3a] via-[#0d2255] to-[#1a3a7a]">
        <div className="relative z-10 px-5 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text + form */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
                Track Your Order
              </h1>
              <p className="text-sm md:text-base text-blue-200/80 mb-8 max-w-md leading-relaxed">
                The countdown to your new gear starts here! Track your Ronin package in real-time as it makes its way to your doorstep.
              </p>

              {/* Tracking form card */}
              <div className="bg-white rounded-2xl p-5 md:p-6 max-w-sm shadow-xl">
                {/* Tabs */}
                <div className="flex gap-0 mb-5 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('order')}
                    className={`flex-1 pb-3 text-sm font-semibold transition ${
                      activeTab === 'order'
                        ? 'text-slate-900 border-b-2 border-slate-900'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Order Number
                  </button>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className={`flex-1 pb-3 text-sm font-semibold transition ${
                      activeTab === 'tracking'
                        ? 'text-slate-900 border-b-2 border-slate-900'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Tracking Number
                  </button>
                </div>

                <form onSubmit={handleTrack} className="space-y-3">
                  {activeTab === 'order' ? (
                    <>
                      <input
                        type="text"
                        placeholder="Order Number"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-gray-400 transition"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-gray-400 transition"
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder="Tracking Number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-gray-400 transition"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold py-3.5 rounded-xl hover:bg-slate-800 transition"
                  >
                    <MapPinIcon className="w-4 h-4" />
                    Track
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Truck illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3]">
                {/* Stylized truck illustration using shapes */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-700/30 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 280" className="w-full h-full opacity-90">
                    {/* Road */}
                    <rect x="0" y="200" width="400" height="80" rx="8" fill="#1e3a5f" opacity="0.5" />
                    <line x1="0" y1="240" x2="400" y2="240" stroke="#3b82f6" strokeWidth="2" strokeDasharray="12 8" opacity="0.4" />
                    {/* Truck body */}
                    <rect x="120" y="110" width="180" height="100" rx="8" fill="#2563eb" />
                    <rect x="120" y="110" width="180" height="30" rx="8" fill="#1d4ed8" />
                    {/* Truck cabin */}
                    <path d="M300 130 L360 130 Q370 130 370 140 L370 210 L300 210 Z" fill="#1e40af" />
                    <rect x="315" y="145" width="40" height="30" rx="4" fill="#93c5fd" opacity="0.6" />
                    {/* Wheels */}
                    <circle cx="170" cy="215" r="18" fill="#111827" />
                    <circle cx="170" cy="215" r="8" fill="#4b5563" />
                    <circle cx="340" cy="215" r="18" fill="#111827" />
                    <circle cx="340" cy="215" r="8" fill="#4b5563" />
                    {/* RONIN text on truck */}
                    <text x="210" y="175" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Inter, sans-serif" letterSpacing="3">RONIN</text>
                    {/* Package icon on truck */}
                    <rect x="140" y="145" width="30" height="25" rx="3" fill="#fbbf24" opacity="0.8" />
                    <line x1="155" y1="145" x2="155" y2="170" stroke="#d97706" strokeWidth="1.5" />
                    <line x1="140" y1="157" x2="170" y2="157" stroke="#d97706" strokeWidth="1.5" />
                    {/* Location pin */}
                    <circle cx="90" cy="100" r="16" fill="#ef4444" opacity="0.9" />
                    <circle cx="90" cy="97" r="6" fill="white" />
                    <path d="M90 116 L84 106 Q82 102 86 100 Q90 98 94 100 Q98 102 96 106 Z" fill="#ef4444" opacity="0.9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Timelines */}
      <section className="px-4 md:px-8 py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Delivery Timelines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {[
              { num: '01', title: 'Karachi & Lahore', days: '1-2 Business Days', cities: null },
              { num: '02', title: 'Major Cities', days: '3-4 Business Days', cities: 'Faisalabad, Islamabad & Rawalpindi' },
              { num: '03', title: 'Other Cities', days: '4-5 Business Days', cities: null },
            ].map((item) => (
              <div key={item.num} className="rounded-2xl bg-white border border-gray-100 p-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-sm font-bold text-slate-700 mb-3">
                  {item.num}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.days}</p>
                {item.cities && <p className="text-xs text-gray-400 mt-1">{item.cities}</p>}
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="flex items-start gap-3 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3">
            <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-slate-900">NOTE</span> Delivery times may vary due to unforeseen circumstances or public holidays.
            </p>
          </div>
        </div>
      </section>

      {/* Need Assistance */}
      <section className="px-4 md:px-8 pb-10 md:pb-14">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] p-6 md:p-10 overflow-hidden relative">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Need Assistance?</h2>
            <p className="text-sm md:text-base text-blue-100 mb-6 leading-relaxed">
              If you have any questions about payment options or need help with your order, our customer support team is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[11px] text-blue-200">Email</span>
                  <span className="block text-sm font-semibold text-white">support@ronin.pk</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[11px] text-blue-200">Phone</span>
                  <span className="block text-sm font-semibold text-white">(021) 111 176 646</span>
                </div>
              </div>
            </div>
          </div>

          {/* Robot illustration */}
          <div className="absolute right-4 bottom-0 md:right-10 md:bottom-0 w-32 h-40 md:w-48 md:h-52 opacity-90">
            <svg viewBox="0 0 200 260" className="w-full h-full">
              {/* Body */}
              <ellipse cx="100" cy="180" rx="50" ry="55" fill="#e2e8f0" />
              {/* Head */}
              <rect x="60" y="80" width="80" height="70" rx="20" fill="#e2e8f0" />
              {/* Screen face */}
              <rect x="72" y="92" width="56" height="40" rx="10" fill="#0ea5e9" />
              {/* Eyes */}
              <circle cx="88" cy="112" r="6" fill="white" />
              <circle cx="112" cy="112" r="6" fill="white" />
              <circle cx="88" cy="112" r="3" fill="#0f172a" />
              <circle cx="112" cy="112" r="3" fill="#0f172a" />
              {/* Mouth */}
              <path d="M88 122 Q100 130 112 122" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
              {/* Antenna */}
              <line x1="100" y1="80" x2="100" y2="60" stroke="#94a3b8" strokeWidth="3" />
              <circle cx="100" cy="56" r="5" fill="#fbbf24" />
              {/* Arms */}
              <rect x="40" y="150" width="15" height="50" rx="7" fill="#cbd5e1" />
              <rect x="145" y="150" width="15" height="50" rx="7" fill="#cbd5e1" />
              {/* Warning triangle */}
              <polygon points="155,75 170,100 140,100" fill="#fbbf24" />
              <text x="155" y="95" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">!</text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TrackOrderPage