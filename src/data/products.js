import MomentImg from '../assets/Black01_62d95393-6fb1-4163-9521-449837187ccf.webp'
import RapImg from '../assets/G1_eefcc742-e98d-4771-8509-f378b8aa4366.webp'
import MultiverseImg from '../assets/01_e962ed57-3981-4d90-8dea-c0dd108af643.webp'
import OceanImg from '../assets/B1_f9868aa0-6d27-4b28-967a-11abd31ea099.webp'
import GlazeImg from '../assets/02_ea844b7f-3f92-429c-9958-db63992c5f08.webp'
import MagnitudeImg from '../assets/Beige01_101c4eb8-3c29-4ff1-a908-2b2ef82198b0.webp'
import LucidImg from '../assets/Blue01_56c0f6fc-0fdd-4fec-a188-e0426adf7c31.webp'
import EvolveImg from '../assets/Black01_b03f28cc-3024-4462-b0f5-70e5c807e5cd.webp'
import MegawattImg from '../assets/01_15d61f6d-1e86-4acd-b41d-41a2884bc4c3.webp'
import MashionProImg from '../assets/White01_4e07f8f4-9b21-46fa-a5fc-d6f2e0ce88c9.webp'

export const newArrivals = [
  {
    id: 1,
    name: "Moment Smart Watch",
    spec: "Super Amoled Retina Display | Adaptive AOD | 50+ Sports Modes",
    specs: [
      { label: 'Model', value: 'Moment Smart Watch' },
      { label: 'Display', value: 'Super AMOLED Retina Display' },
      { label: 'Always-On Display', value: 'Adaptive AOD' },
      { label: 'Sports Modes', value: '50+' },
      { label: 'Sensors', value: 'Heart rate, SpO2, Sleep tracking' },
    ],
    overview:
      "A powerhouse on your wrist, the Moment Smart Watch pairs a super AMOLED retina display with an adaptive always-on display for effortless glanceability. With 50+ sports modes, precise health tracking, and smooth performance, it's built to keep up with every workout and everyday moment.",
    specsText:
      "A 1.4-inch super AMOLED retina display delivers brilliant colours and sharp detail, while adaptive AOD keeps time visible the moment you glance at it. Health sensors track heart rate, SpO2 and sleep, and 50+ sports modes cover everything from running and cycling to swimming.",
    faqs: [
      { question: 'Does it support calling?', answer: 'Yes, it supports Bluetooth calling with a built-in speaker and noise reduction for clear calls.' },
      { question: 'How long does the battery last?', answer: 'With typical use you can expect up to 7 days on a single charge, depending on display-on brightness and usage.' },
      { question: 'What sports modes are included?', answer: 'It includes 50+ sports modes covering running, cycling, swimming, gym workouts and more, with automatic activity detection.' },
    ],
    price: 14995,
    originalPrice: 19995,
    rating: 4.8,
    category: 'smart-watches',
    image: MomentImg,
    tag: "NEWLY LAUNCHED",
    tagColor: "bg-gradient-to-b from-sky-400 to-blue-700",
  },
  {
    id: 2,
    name: "Rap Headphone",
    spec: "40mm Speaker Drivers | BT 6.0 | Dual Device Connectivity",
    specs: [
      { label: 'Model', value: 'Rap Headphone' },
      { label: 'Drivers', value: '40mm Speaker Drivers' },
      { label: 'Bluetooth', value: '6.0' },
      { label: 'Connectivity', value: 'Dual Device' },
      { label: 'Battery', value: 'Up to 10 hours playtime' },
    ],
    overview:
      "Tuned for rich, room-filling audio, the Rap Headphone delivers deep bass through 40mm speaker drivers. Bluetooth 6.0 and dual device connectivity let you switch seamlessly between your phone and laptop, making it the everyday companion for calls, music, and long listening sessions.",
    specsText:
      "Large 40mm speaker drivers push deep, punchy bass, while Bluetooth 6.0 ensures a stable, low-latency connection. Dual device connectivity lets you pair two gadgets and switch between them instantly, and the plush over-ear cushions keep long sessions comfortable.",
    faqs: [
      { question: 'Does it support dual device connection?', answer: 'Yes, you can connect two devices at once and switch seamlessly between them.' },
      { question: 'How is the bass quality?', answer: 'The 40mm drivers deliver massive, deep bass with a well-balanced mid and clear treble for a rich, punchy sound.' },
      { question: 'Is there a warranty?', answer: 'Yes, 1 year official brand warranty with 7 days replacement.' },
    ],
    price: 4495,
    originalPrice: 5995,
    rating: 4.5,
    category: 'headphones',
    image: RapImg,
    tag: "SOFTWARE BASED",
    tagColor: "bg-gradient-to-b from-red-500 to-purple-800",
    colors: ["#1e293b", "#0891b2"],
  },
  {
    id: 3,
    name: "Multiverse Charger",
    spec: "140W | 6-in-1 Desk Charger | GaN & QC | Dedicated",
    specs: [
      { label: 'Model', value: 'Multiverse Charger' },
      { label: 'Power Output', value: '140W' },
      { label: 'Ports', value: '6-in-1 Desk Charger' },
      { label: 'Technology', value: 'GaN & QC' },
      { label: 'Charging', value: 'Dedicated high-wattage port for laptops' },
    ],
    overview:
      "A 140W, 6-in-1 desk charger that consolidates your entire setup into one hub. Built with GaN and QC technology, the Multiverse powers your laptop, phone, watch, and earbuds simultaneously with fast, efficient charging and dedicated output for high-draw devices.",
    specsText:
      "With a 140W total output and 6 charging ports, the Multiverse handles your whole desk at once. GaN and QC technology keep it compact and cool while fast-charging laptops, phones and accessories, and a dedicated port preserves maximum wattage for high-draw devices.",
    faqs: [
      { question: 'What devices can it charge?', answer: 'It can power a laptop, phone, smart watch and earbuds at the same time across its 6 ports.' },
      { question: 'How many devices at once?', answer: 'Up to 6 devices simultaneously, with a dedicated port for high-wattage laptop charging.' },
      { question: 'Is it fast charging?', answer: 'Yes, it supports fast charging via GaN and QC technology for most modern phones and laptops.' },
    ],
    price: 8195,
    originalPrice: 9995,
    rating: 5.0,
    category: 'chargers',
    image: MultiverseImg,
    tag: "NEWLY LAUNCHED",
    colors: ["#0d9488", "#0f172a"],
  },
  {
    id: 4,
    name: "Ocean Neckband",
    spec: "150-Hour Playback Neckband | Bass mode",
    specs: [
      { label: 'Model', value: 'Ocean Neckband' },
      { label: 'Playback', value: '150 Hours' },
      { label: 'Sound Mode', value: 'Bass Mode' },
      { label: 'Connectivity', value: 'Bluetooth / Wired' },
      { label: 'Design', value: 'Magnetic earbuds, lightweight neckband' },
    ],
    overview:
      "Dive into up to 150 hours of playback with the Ocean Neckband. Engineered for bass lovers, this neckband delivers punchy, immersive sound, a comfortable all-day fit, and battery life that lets you go days between charges.",
    specsText:
      "A 150-hour playback battery lets you go weeks on a single charge, and a dedicated bass mode pumps up low-end impact for music that hits harder. The flexible, lightweight neckband sits comfortably all day, with magnetic earbuds that stay put when not in use.",
    faqs: [
      { question: 'How long does the battery last?', answer: 'Up to 150 hours of playback on a single charge, depending on volume and usage.' },
      { question: 'Is there a bass boost?', answer: 'Yes, a dedicated bass mode enhances low-end frequencies for a deeper, more immersive sound.' },
      { question: 'Do the earbuds have magnets?', answer: 'Yes, the earbuds are magnetic so they clip together neatly around your neck when not in use.' },
    ],
    price: 6995,
    originalPrice: 8995,
    rating: 5.0,
    category: 'neckbands',
    image: OceanImg,
    tag: "NEWLY LAUNCHED",
  },
]

export const softwareBased = [
  {
    id: 5,
    name: "Glaze Earbuds",
    spec: "Best for Calling & Meetings | Dual device connectivity | ENC Quad Mic",
    specs: [
      { label: 'Model', value: 'Glaze Earbuds' },
      { label: 'Best For', value: 'Calling & Meetings' },
      { label: 'Microphone', value: 'ENC Quad Mic' },
      { label: 'Connectivity', value: 'Dual Device' },
      { label: 'Battery', value: 'Up to 8 hours playtime' },
    ],
    overview:
      "Engineered for calling and meetings, Glaze Earbuds feature ENC quad-mic technology that keeps your voice crystal clear in noisy environments. Dual device connectivity and a comfortable fit make it the go-to choice for professionals on the move.",
    specsText:
      "ENC quad-mic technology filters background noise so your voice stays crystal clear on calls and in meetings. Dual device connectivity lets you hop between your phone and laptop, and the compact in-ear design stays comfortable through hour-long conversations.",
    faqs: [
      { question: 'Is it good for calls?', answer: 'Yes, ENC quad-mic technology is optimised for clear voice capture, making it ideal for calling and meetings.' },
      { question: 'Does it support dual device connection?', answer: 'Yes, you can connect to two devices at once and switch between them seamlessly.' },
      { question: 'How effective is the noise cancellation?', answer: 'The ENC (environmental noise cancellation) suppresses background chatter for clearer calls and recordings.' },
    ],
    price: 5695,
    originalPrice: 7795,
    rating: 4.9,
    category: 'earbuds',
    image: GlazeImg,
    tag: "SOFTWARE BASED",
    tagColor: "bg-gradient-to-b from-red-500 to-purple-800",
    colors: ["#0f172a"],
  },
  {
    id: 6,
    name: "Magnitude Headphone",
    spec: "Mood Tuned Sound | Massive Bass | Dual Attached Cable",
    specs: [
      { label: 'Model', value: 'Magnitude Headphone' },
      { label: 'Sound Mode', value: 'Mood Tuned Sound' },
      { label: 'Bass', value: 'Massive Bass' },
      { label: 'Cable', value: 'Dual Attached Cable' },
      { label: 'Connectivity', value: 'Wired' },
    ],
    overview:
      "With mood-tuned sound and massive bass, the Magnitude Headphone puts you right in the middle of the music. Its dual attached cable design adds a classic feel, while big, cushioned drivers deliver deep, punchy audio across every genre.",
    specsText:
      "Mood-tuned sound profiles adapt the tuning to what you're listening to, while massive bass adds depth and slam to every track. A dual attached cable offers a reliable wired connection, and over-ear cushions deliver strong isolation for an immersive, focused listen.",
    faqs: [
      { question: 'What is mood-tuned sound?', answer: 'It is a tuning profile that shapes the frequency response for a richer, more emotional listening experience.' },
      { question: 'How does the audio connect?', answer: 'It uses a dual attached cable for a stable, high-quality wired connection.' },
      { question: 'What is the bass like?', answer: 'The drivers produce massive, deep bass with good detail, tuned for a punchy yet balanced sound signature.' },
    ],
    price: 4995,
    originalPrice: 8095,
    rating: 4.8,
    category: 'headphones',
    image: MagnitudeImg,
    tag: "SOFTWARE BASED",
    tagColor: "bg-gradient-to-b from-red-500 to-purple-800",
    colors: ["#e5e7eb", "#0f172a"],
  },
  {
    id: 7,
    name: "Lucid Earbuds",
    spec: "Dual Device Connectivity | Signature Sound Mode | ENC | Quad Mic",
    specs: [
      { label: 'Model', value: 'Lucid Earbuds' },
      { label: 'Sound Mode', value: 'Signature Sound Mode' },
      { label: 'Microphone', value: 'ENC Quad Mic' },
      { label: 'Connectivity', value: 'Dual Device' },
      { label: 'Battery', value: 'Up to 9 hours playtime' },
    ],
    overview:
      "Signature sound mode, dual device connectivity, and ENC with quad mics make Lucid Earbuds a true audio upgrade. Clear calls, immersive music, and reliable battery life combine in a sleek, comfortable pair of earbuds built for all-day use.",
    specsText:
      "A signature sound mode delivers a balanced, detailed listening experience, while ENC with quad mics keeps calls clear in busy surroundings. Dual device connectivity lets you switch between your phone and laptop, and the compact earbuds offer a comfortable, secure all-day fit.",
    faqs: [
      { question: 'What is the signature sound mode?', answer: 'It is a carefully tuned sound profile designed for a balanced, immersive listening experience.' },
      { question: 'Can it connect to two devices?', answer: 'Yes, dual device connectivity lets you pair two devices and switch between them seamlessly.' },
      { question: 'How are the microphone and calls?', answer: 'ENC with quad mics filters background noise so your voice stays clear during calls.' },
    ],
    price: 6795,
    originalPrice: 7995,
    rating: 5.0,
    category: 'earbuds',
    image: LucidImg,
    tag: "SOFTWARE BASED",
    tagColor: "bg-gradient-to-b from-red-500 to-purple-800",
    colors: ["#1e40af", "#0f172a"],
  },
  {
    id: 8,
    name: "Evolve Earbuds",
    spec: "Dual ear fit | Customize Half & Full-in-Ear fit | 35 Hrs Music Time",
    specs: [
      { label: 'Model', value: 'Evolve Earbuds' },
      { label: 'Ear Fit', value: 'Dual Fit (Half & Full-in-Ear)' },
      { label: 'Music Time', value: '35 Hours' },
      { label: 'Connectivity', value: 'Bluetooth' },
      { label: 'Battery', value: 'Up to 35 hours playtime' },
    ],
    overview:
      "Adapt to how you listen with Evolve Earbuds' dual ear fit that switches between half-in and full-in-ear comfort. Up to 35 hours of music time plus a customizable fit make these earbuds a versatile companion for work, workouts, and everything in between.",
    specsText:
      "A dual ear fit system lets you choose between half-in and full-in-ear styles, so you get the fit that feels right. With up to 35 hours of music time and a lightweight, comfortable build, Evolve Earbuds are ready for all-day listening across work, travel and workouts.",
    faqs: [
      { question: 'What is dual ear fit?', answer: 'It lets you customise between half-in-ear and full-in-ear fit styles for the comfort you prefer.' },
      { question: 'How long does the battery last?', answer: 'Up to 35 hours of music time on a single charge, depending on volume and usage.' },
      { question: 'Are they comfortable for long use?', answer: 'Yes, the lightweight design and adjustable fit are made for comfortable all-day wear.' },
    ],
    price: 5295,
    originalPrice: 6495,
    rating: 5.0,
    category: 'earbuds',
    image: EvolveImg,
    tag: "SOFTWARE BASED",
    tagColor: "bg-gradient-to-b from-red-500 to-purple-800",
    colors: ["#0f172a"],
  },
]

export const topTrending = [
  {
    id: 9,
    name: "Lucid Earbuds",
    spec: "Dual Device Connectivity | Signature Sound Mode | ENC | Quad Mic",
    price: 6795,
    originalPrice: 7995,
    rating: 5.0,
    category: 'earbuds',
    image: LucidImg,
    colors: ["#1e40af", "#0f172a"],
  },
  {
    id: 10,
    name: "Megawatt",
    spec: "30000 MAH | 85 Watt Fast Charging | Massive Base | Type-C Cable",
    specs: [
      { label: 'Model', value: 'Megawatt' },
      { label: 'Capacity', value: '30000 mAh' },
      { label: 'Fast Charging', value: '85W' },
      { label: 'Cable', value: 'Built-in Type-C' },
      { label: 'Output', value: 'Multiple ports for multi-device charging' },
    ],
    overview:
      "Massive 30000mAh capacity meets 85W fast charging in the Megawatt power bank. Built to keep your devices running for days, it features a generous battery, rapid output, and a Type-C cable for quick, reliable power wherever you are.",
    specsText:
      "A 30000mAh battery provides days of backup power, and 85W fast charging tops up laptops, phones and tablets at speed. A built-in Type-C cable plus extra output ports make it easy to charge multiple devices at once, wherever you are.",
    faqs: [
      { question: 'How much capacity does it have?', answer: 'It has a 30000mAh battery, enough for multiple charges of a phone and most laptops.' },
      { question: 'How fast does it charge?', answer: 'It supports 85W fast charging for rapid top-ups of compatible devices.' },
      { question: 'Does it include a cable?', answer: 'Yes, it includes a built-in Type-C cable for convenient, no-fuss charging.' },
    ],
    price: 11495,
    originalPrice: 12995,
    rating: 4.6,
    category: 'power-banks',
    image: MegawattImg,
  },
  {
    id: 11,
    name: "Mashion Pro Earbuds",
    spec: "Immersive Sound | Half-in | 13mm drivers",
    specs: [
      { label: 'Model', value: 'Mashion Pro Earbuds' },
      { label: 'Drivers', value: '13mm' },
      { label: 'Sound', value: 'Immersive Sound' },
      { label: 'Design', value: 'Half-in-Ear' },
      { label: 'Battery', value: 'Up to 8 hours playtime' },
    ],
    overview:
      "Immerse yourself in studio-grade audio with Mashion Pro Earbuds. Large 13mm drivers deliver full, detailed sound in a half-in-ear design that stays comfortable all day, pairing balanced bass with crisp vocals for an effortless listen.",
    specsText:
      "Powerful 13mm drivers produce full, detailed sound with punchy bass and crisp vocals, all in a half-in-ear design that sits comfortably for hours. Quick pairing, stable connectivity and lightweight build make Mashion Pro Earbuds an easy choice for daily listening.",
    faqs: [
      { question: 'How is the sound quality?', answer: 'The 13mm drivers deliver immersive, well-balanced sound with punchy bass and clear vocals.' },
      { question: 'Are they comfortable?', answer: 'Yes, the half-in-ear design is lightweight and designed for comfortable all-day wear.' },
      { question: 'Do they support fast pairing?', answer: 'Yes, they pair quickly and maintain a stable connection with your device.' },
    ],
    price: 4995,
    originalPrice: 6495,
    rating: 5.0,
    category: 'earbuds',
    image: MashionProImg,
  },
  {
    id: 12,
    name: "Glaze Earbuds",
    spec: "Best for Calling & Meetings | Dual device connectivity | ENC Quad Mic",
    price: 5695,
    originalPrice: 7795,
    rating: 4.9,
    category: 'earbuds',
    image: GlazeImg,
    tag: "NEWLY LAUNCHED",
    tagColor: "bg-gradient-to-b from-sky-400 to-blue-700",
    colors: ["#0f172a"],
  },
]
