import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { personalInfo } from '../data/portfolioData'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleLinkClick = (id) => {
    setActiveLink(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-100 px-4 md:px-8 py-4 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-2xl bg-dark/80 border-b border-primary/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-xl md:text-2xl font-display font-800 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {personalInfo.name.split(' ')[0]}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.id} className="relative">
                <ScrollLink
                  to={link.id}
                  smooth
                  duration={500}
                  className="cursor-pointer text-gray-300 hover:text-primary transition-colors font-medium text-sm"
                  onClick={() => handleLinkClick(link.id)}
                  data-cursor="hover"
                >
                  {link.label}
                </ScrollLink>
                {activeLink === link.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeLink"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 cursor-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor="hover"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 12 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: -12 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 bg-surface/95 backdrop-blur-md z-40 md:hidden flex items-center justify-center pt-20"
        initial={{ x: '100%' }}
        animate={isMobileMenuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <ScrollLink
                to={link.id}
                smooth
                duration={500}
                className="text-2xl font-display font-700 text-primary hover:text-secondary transition-colors cursor-pointer"
                onClick={() => handleLinkClick(link.id)}
              >
                {link.label}
              </ScrollLink>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

