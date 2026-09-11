import HeroCarousel from '../components/home/HeroCarousel'
import PromoBanner from '../components/home/PromoBanner'
import ProductGrid from '../components/home/ProductGrid'
import ProductScrollSection from '../components/home/ProductScrollSection'
import TrustBadges from '../components/home/TrustBadges'
import CategoryBanners from '../components/home/CategoryBanners'
import BrandAmbassadors from '../components/home/BrandAmbassadors'
import BestSellerBanner from '../components/home/BestSellerBanner'
import GenerationRonin from '../components/home/GenerationRonin'
import FeaturedLogos from '../components/home/FeaturedLogos'
import AboutSection from '../components/home/AboutSection'
import PersonalizedBanner from '../components/home/PersonalizedBanner'
import { newArrivals, softwareBased, topTrending } from '../data/products'

function Home() {
  return (
    <div>
      <HeroCarousel />
      <PromoBanner />
      <ProductScrollSection title="New Arrivals" products={newArrivals} />
      <TrustBadges />
      <CategoryBanners />
      <BrandAmbassadors />
      <ProductGrid title="Software Based" products={softwareBased} />
      <BestSellerBanner />
      <ProductGrid title="Top Trending" products={topTrending} />
      <PersonalizedBanner />
      <GenerationRonin />
      <FeaturedLogos />
      <AboutSection />
    </div>
  )
}

export default Home