import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isProjectHover, setIsProjectHover] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoothing for the ring
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('data-cursor') === 'hover') {
        setIsHovering(true)
      }
      if (target.closest('[data-project-card]')) {
        setIsProjectHover(true)
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('data-cursor') === 'hover') {
        setIsHovering(false)
      }
      if (target.closest('[data-project-card]')) {
        setIsProjectHover(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter, true)
    document.addEventListener('mouseout', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter, true)
      document.removeEventListener('mouseout', handleMouseLeave, true)
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  const ringSize = isProjectHover ? 80 : isHovering ? 60 : 36
  const ringColor = isProjectHover || isHovering ? 'rgba(60, 66, 69, 0.3)' : 'transparent'

  return (
    <>
      {/* Dot - follows mouse exactly */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Ring - smooth lag follow */}
      <motion.div
        className="fixed rounded-full border-2 border-primary pointer-events-none z-[9998]"
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: ringColor,
        }}
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}


