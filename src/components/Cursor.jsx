import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isProjectHover, setIsProjectHover] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Check if device supports hover (not mobile)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('data-cursor') === 'hover'
      ) {
        setIsHovering(true)
      }
      if (target.closest('[data-project-card]')) {
        setIsProjectHover(true)
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('data-cursor') === 'hover'
      ) {
        setIsHovering(false)
      }
      if (target.closest('[data-project-card]')) {
        setIsProjectHover(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  // Skip rendering on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const ringSize = isProjectHover ? 80 : isHovering ? 60 : 36
  const ringColor = isProjectHover || isHovering ? 'rgba(124, 58, 237, 0.3)' : 'transparent'

  return (
    <>
      {/* Dot - instant follow */}
      <motion.div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full bg-primary pointer-events-none z-9998"
        style={{
          left: position.x,
          top: position.y,
          x: -4,
          y: -4,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ring - smooth lag follow */}
      <motion.div
        ref={ringRef}
        className="fixed rounded-full border-2 border-primary pointer-events-none z-9998"
        style={{
          left: position.x,
          top: position.y,
          x: -ringSize / 2,
          y: -ringSize / 2,
          width: ringSize,
          height: ringSize,
          backgroundColor: ringColor,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          width: ringSize,
          height: ringSize,
          backgroundColor: ringColor,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.5,
        }}
      />
    </>
  )
}


