import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProductOverview from './components/ProductOverview.jsx'
import Features from './components/Features.jsx'
import Pricing from './components/Pricing.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-dark focus:px-5 focus:py-2.5 focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="konten">
        <Hero />
        <ProductOverview />
        <Features />
        <Pricing />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
