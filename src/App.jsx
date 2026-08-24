import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Products from './components/Products'
import Solutions from './components/Solutions'
import Company from './components/Company'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false) 

  return (
    <>
      <Header openModal={() => setIsModalOpen(true)} />
      <main>
        <Hero openModal={() => setIsModalOpen(true)} />
        <Capabilities />
        <Products />
        <Solutions />
        <Company />
        <CTA openModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      {isModalOpen && <ContactModal closeModal={() => setIsModalOpen(false)} />}
    </>
  )
}

export default App
