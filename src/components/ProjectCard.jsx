import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const ProjectCard = ({ project, onClick, index }) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    const rotateY = ((e.clientX - cardCenterX) / rect.width) * -15
    const rotateX = ((e.clientY - cardCenterY) / rect.height) * 15
    const sheenX = ((e.clientX - rect.left) / rect.width) * 100
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100
    setTilt({ x: rotateX, y: rotateY })
    setSheenPos({ x: sheenX, y: sheenY })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
    setSheenPos({ x: 50, y: 50 })
  }

  const cardStyle = isMobile
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: isHovering ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }

  return (
    <motion.div
      ref={cardRef}
      data-project-card
      className="project-card group relative rounded-2xl overflow-hidden cursor-none flex-shrink-0"
      style={{
        width: isMobile ? '100%' : '380px',
        height: isMobile ? 'auto' : '480px',
        ...cardStyle,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      data-cursor="hover"
    >
      {/* Card Background */}
      <div
        className="relative h-full flex flex-col"
        style={{
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: isHovering ? `0 20px 60px ${project.color}30` : 'none',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* Sheen overlay (desktop only) */}
        {!isMobile && isHovering && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Top Image Area */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            height: isMobile ? '180px' : '220px',
            background: `linear-gradient(135deg, ${project.color}30, ${project.color}10, transparent)`,
          }}
        >
          {/* Big faded project number */}
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-800 select-none pointer-events-none"
            style={{
              fontSize: '8rem',
              color: `${project.color}12`,
              lineHeight: 1,
            }}
          >
            {String(project.id).padStart(2, '0')}
          </span>

          {/* Tech stack pills */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full font-mono backdrop-blur-sm"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Title */}
          <h3 className="text-xl font-display font-700 text-gray-100 mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Short Description */}
          <p
            className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.shortDesc}
          </p>

          {/* Footer Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  data-cursor="hover"
                  aria-label="View source on GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
                  onClick={(e) => e.stopPropagation()}
                  data-cursor="hover"
                  aria-label="View live demo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>

            <span
              className="text-sm font-medium flex items-center gap-2 transition-colors"
              style={{ color: project.color }}
              data-cursor="hover"
            >
              View Details
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
