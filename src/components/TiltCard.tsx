// src/components/TiltCard.tsx
'use client'
import Tilt from 'react-parallax-tilt'
import React from 'react'

export function TiltCard({ children }: { children: React.ReactNode }) {
  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={false} className="w-full">
      {children}
    </Tilt>
  )
}
