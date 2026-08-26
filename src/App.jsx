import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PointOfView from './components/Capabilities'
import Products from './components/Products'
import Solutions from './components/Solutions'
import UseCases from './components/Company'
import WhyBlaiselogic from './components/WhyBlaiselogic'
import Insights from './components/Insights'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header openModal={() => setIsModalOpen(true)} />
      <main id="top">
        <Hero openModal={() => setIsModalOpen(true)} />
        <PointOfView />
        <Products openModal={() => setIsModalOpen(true)} />
        <UseCases />
        <WhyBlaiselogic />
        <Insights openModal={() => setIsModalOpen(true)} />
        <Solutions />
        <CTA openModal={() => setIsModalOpen(true)} />
      </main>
      <Footer openModal={() => setIsModalOpen(true)} />
      {isModalOpen && <ContactModal closeModal={() => setIsModalOpen(false)} />}
    </>
  )
}

export default App
