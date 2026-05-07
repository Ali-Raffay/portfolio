import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ThreeScene } from './components/ThreeScene'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Remove reduced motion if needed
    return () => {}
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <Cursor />
      <AnimatePresence>
        {!isLoaded && (
          <Loader onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>
      
      {isLoaded && (
        <>
          <Navbar />
          <ThreeScene />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </>
      )}
    </div>
  )
}

export default App
