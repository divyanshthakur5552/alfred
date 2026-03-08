"use client"

import { ShaderAnimation } from "@/components/ui/shader-animation"
import RotatingEarth from "@/components/ui/wireframe-dotted-globe"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Play } from "lucide-react"

interface ShaderHeroProps {
  title: React.ReactNode
  subtitle: string
  eyebrow?: string
  ctaLabel?: string
  ctaHref?: string
}

export function ShaderHero({ title, subtitle, eyebrow, ctaLabel, ctaHref }: ShaderHeroProps) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Shader animation background */}
      <ShaderAnimation />
      
      {/* Globe layer - behind text but in front of shader */}
      <div className="absolute inset-0 z-5 flex items-center justify-center">
        <RotatingEarth width={1000} height={1000} className="pointer-events-none" />
      </div>
      
      {/* Text content layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        {eyebrow && (
          <span className="mb-4 text-sm font-medium tracking-wider text-white/80 uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl">
          {title}
        </h1>
        <p className="mb-8 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        {ctaLabel && ctaHref && (
          <ShinyButton 
            onClick={() => window.location.href = ctaHref}
            icon={<Play size={20} fill="currentColor" />}
          >
            {ctaLabel}
          </ShinyButton>
        )}
      </div>
    </div>
  )
}