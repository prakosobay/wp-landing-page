import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Contents from './components/Contents.jsx'
import Registration from './components/Registration.jsx'
import Companions from './components/Companions.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Pricing from './components/Pricing.jsx'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import { PromoBar } from './components/Promo.jsx'
import { OrderProvider } from './components/OrderModals.jsx'

export default function App() {
  return (
    <OrderProvider>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-forest focus:px-5 focus:py-3 focus:text-paper"
      >
        Lewati ke konten utama
      </a>
      <PromoBar />
      <Navbar />
      <main id="konten">
        <Hero />
        <Contents />
        <Registration />
        <Companions />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </OrderProvider>
  )
}
