import React, { useEffect, useRef } from 'react'

export const ThreeScene = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js'
    document.head.appendChild(script)

    script.onload = () => {
      if (containerRef.current && !containerRef.current.querySelector('spline-viewer')) {
        const viewer = document.createElement('spline-viewer')
        viewer.setAttribute('url', 'https://prod.spline.design/YLUO2m8F98Pj2vMp/scene.splinecode')
        viewer.style.width = '100%'
        viewer.style.height = '100%'
        viewer.style.display = 'flex'
        viewer.style.alignItems = 'center'
        viewer.style.justifyContent = 'center'
        containerRef.current.appendChild(viewer)
      }
    }

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: 'translateX(10%)' 
        }}
      />
      {/* Overlay to hide Spline watermark */}
      <div className="absolute bottom-0 right-0 w-32 h-12 bg-black z-10" />
    </div>
  )
}
