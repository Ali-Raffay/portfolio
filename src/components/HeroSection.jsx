import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { personalInfo } from '../data/portfolioData'

export const HeroSection = () => {
  const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentFullRole = roles[currentRole]
    const speed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullRole.length) {
        setDisplayText(currentFullRole.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentFullRole.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentFullRole.length) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && charIndex === 0) {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsDeleting(false)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, currentRole])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full pt-32 pb-20 px-4 md:px-8 z-10 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            {/* Available Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 w-fit mb-6 px-4 py-2 border border-primary/50 rounded-full bg-primary/10"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Available for work</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-800 mb-4 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #f1f0ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Hi, I'm {personalInfo.name}
            </motion.h1>

            {/* Typewriter Line */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-body text-secondary mb-6 h-10"
            >
              I build <span className="text-primary font-semibold">{displayText}</span>
              <span className="animate-pulse">|</span>
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <ScrollLink
                to="projects"
                smooth
                duration={500}
                className="cursor-none"
                data-cursor="hover"
              >
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
              </ScrollLink>

              <motion.a
                href={personalInfo.resumeUrl}
                download
                className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors cursor-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-none"
                whileHover={{ scale: 1.1 }}
                data-cursor="hover"
              >
                <span className="text-lg">🐙</span>
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-none"
                whileHover={{ scale: 1.1 }}
                data-cursor="hover"
              >
                <span className="text-lg">💼</span>
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-none"
                whileHover={{ scale: 1.1 }}
                data-cursor="hover"
              >
                <span className="text-lg">📧</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - 3D Object Space */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center justify-center"
          >
            {/* 3D object from ThreeScene floats here */}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-center text-gray-500 text-sm mb-2">Scroll</p>
          <div className="text-primary text-2xl">↓</div>
        </motion.div>
      </div>
    </section>
  )
}

