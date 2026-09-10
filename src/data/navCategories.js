import IconEarbuds from '../assets/Icon-earbuds.svg'
import IconHeadphone from '../assets/icon-headphone.svg'
import IconSpeaker from '../assets/Icon_Speaker.svg'
import IconNeckband from '../assets/Neckband_Icon_2.svg'
import IconHandsfree from '../assets/Icon_Handsfree.svg'
import IconSmartwatch from '../assets/Icon-smartwatch.svg'
import IconPowerbank from '../assets/Icon_Powerbank.svg'
import IconChargers from '../assets/Icon-chargers.svg'
import IconCables from '../assets/Icon-cables.svg'
import IconMic from '../assets/Mic.svg'
import IconTracker from '../assets/Tracker.svg'
import IconAccessories from '../assets/Cables.svg'


// Mega-menu thumbnails (representative local product renders)
import EarbudLucid from '../assets/Lucid_converted_c410f292-d9ca-453a-8549-39426cb994a7.avif'
import EarbudMistPro from '../assets/Mist_Pro_converted.avif'
import EarbudVector from '../assets/Vector_converted_4d1102ba-7acd-49a6-b59a-64b3985d9d80.avif'
import EarbudEvolve from '../assets/Evolve_converted_934371a1-a7cd-466c-9627-406d13b6c78f.avif'
import EarbudGlaze from '../assets/Banner-D--glaze_converted.avif'
import EarbudGaming from '../assets/Gaming_68965b1b-43ac-42be-9468-1888f4062d04.webp'
import HeadphoneMagnitude from '../assets/Magnitude_Card_d76ad7da-f2d4-4afe-b81f-e785973cd49d.avif'
import HeadphoneMagnus from '../assets/Magnus_Card_6b5bd65a-80eb-408e-98f4-e2104c9307f1.avif'
import HeadphoneWireless from '../assets/headphone-wireless.webp'
import SpeakerZapster from '../assets/Zapster01.webp'
import SpeakerPortable from '../assets/4_09f22769-d7a5-458d-b3f8-63fc6248e828.avif'
import NeckbandBlue from '../assets/Blue01_2b9722f7-1e37-4191-9696-7786d6ff568c.webp'
import NeckbandWhite from '../assets/White02_87e6cf89-99b2-4953-aa01-2a479529748c.webp'
import HandsfreeWired from '../assets/R-9Handsfreeandroid.png'
import HandsfreeTypeC from '../assets/R-27TC-01.png'
import WatchAmoled from '../assets/Black01_cb9330e2-5d80-4942-bca0-8730c3b39d2a.webp'
import WatchSport from '../assets/Silver01_b502add5-db68-4e1f-80fe-b436d6aa5095.webp'
import WatchCalling from '../assets/Gold01_b14e770b-7fe2-488e-a7c0-96aba9ee4f09.webp'
import PowerBank10000 from '../assets/10000_mAh_7d61c97c-fe4e-41aa-882e-9e693791b516.png'
import PowerBank20000 from '../assets/20000_mAh_32fe73ce-9f0f-4b0d-afa1-409e3d416e10.png'
import ChargerWall from '../assets/charger1_df8fd110-637f-4969-a946-0b08317c8bf0.png'
import ChargerCar from '../assets/R-2030Android-01.png'
import CableTypeC from '../assets/Type-C01_190cc5a4-3742-4feb-ada4-2c63aaeeb141.webp'
import CableLightning from '../assets/R-2035Lightning03.webp'
import MicLavalier from '../assets/Mic.svg'
import MicWireless from '../assets/Mic.svg'
import TrackerImg from '../assets/Tracker.svg'
import AccessoryCases from '../assets/Leather_Card.png'
import AccessoryStraps from '../assets/Strap.png'

export const navCategories = [
  {
    label: "Earbuds",
    collection: "earbuds",
    icon: IconEarbuds,
    items: [
      { name: "Software Based Earbuds", image: EarbudLucid },
      { name: "ANC Earbuds", image: EarbudMistPro },
      { name: "ENC Earbuds", image: EarbudVector },
      { name: "Dual Device Connection", image: EarbudEvolve },
      { name: "Best Earbuds for Calling", image: EarbudGlaze },
      { name: "Gaming Earbuds", image: EarbudGaming },
    ],
  },
  {
    label: "Headphones",
    collection: "headphones",
    icon: IconHeadphone,
    items: [
      { name: "Wireless Headphones", image: HeadphoneMagnitude },
      { name: "ANC Headphones", image: HeadphoneMagnus },
      { name: "Gaming Headphones", image: HeadphoneWireless },
    ],
  },
  {
    label: "Speaker",
    collection: "speaker",
    icon: IconSpeaker,
    items: [
      { name: "Bluetooth Speakers", image: SpeakerZapster },
      { name: "Portable Speakers", image: SpeakerPortable },
    ],
  },
  {
    label: "Neckbands",
    collection: "neckbands",
    icon: IconNeckband,
    items: [
      { name: "Sports Neckbands", image: NeckbandBlue },
      { name: "Magnetic Neckbands", image: NeckbandWhite },
    ],
  },
  {
    label: "Handsfree",
    collection: "handsfree",
    icon: IconHandsfree,
    items: [
      { name: "Wired Handsfree", image: HandsfreeWired },
      { name: "Type-C Handsfree", image: HandsfreeTypeC },
    ],
  },
  {
    label: "Smart Watches",
    collection: "smart-watches",
    icon: IconSmartwatch,
    items: [
      { name: "AMOLED Smart Watches", image: WatchAmoled },
      { name: "Sports Smart Watches", image: WatchSport },
      { name: "Calling Smart Watches", image: WatchCalling },
    ],
  },
  {
    label: "Power Banks",
    collection: "power-banks",
    icon: IconPowerbank,
    items: [
      { name: "Fast Charging Power Banks", image: PowerBank20000 },
      { name: "Slim Power Banks", image: PowerBank10000 },
    ],
  },
  {
    label: "Chargers",
    collection: "chargers",
    icon: IconChargers,
    items: [
      { name: "Wall Chargers", image: ChargerWall },
      { name: "Car Chargers", image: ChargerCar },
      { name: "Multi-Port Chargers", image: ChargerWall },
    ],
  },
  {
    label: "Cables",
    collection: "cables",
    icon: IconCables,
    items: [
      { name: "Type-C Cables", image: CableTypeC },
      { name: "Lightning Cables", image: CableLightning },
    ],
  },
  {
    label: "Vlogging Mic",
    collection: "vlogging-mics",
    icon: IconMic,
    items: [
      { name: "Lavalier Mics", image: MicLavalier },
      { name: "Wireless Vlogging Mics", image: MicWireless },
    ],
  },
  {
    label: "Trackers",
    collection: "trackers",
    icon: IconTracker,
    items: [
      { name: "Bluetooth Trackers", image: TrackerImg },
    ],
  },
  {
    label: "Accessories",
    collection: "accessories",
    icon: IconAccessories,
    items: [
      { name: "Cases & Covers", image: AccessoryCases },
      { name: "Straps", image: AccessoryStraps },
    ],
  },
]