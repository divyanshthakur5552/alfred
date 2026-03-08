"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { TextReveal } from "@/components/ui/text-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import KeyboardDemo from "@/components/keyboard-demo";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen w-full py-20 bg-black overflow-hidden">
      {/* Background Ripple Effect */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundRippleEffect rows={20} cols={30} cellSize={70} />
      </div>
      
      {/* Gradient overlay - black via transparent to black */}
      <div className="absolute inset-0 z-[4] pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />

      {/* Scroll Velocity Text */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden mb-16">
        <ScrollVelocityContainer className="text-2xl font-bold tracking-[-0.02em] md:text-4xl md:leading-[3rem] text-white">
          <ScrollVelocityRow baseVelocity={3} direction={1}>
            Natural Language • AI Vision • Automation •
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={3} direction={-1}>
            Two-Model Pipeline • Cross-App Control •
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
     
      </div>

      {/* Text Reveal Animation */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        {/* Keyboard Demo positioned behind the text */}
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-30">
          <div className="transform rotate-45 scale-50 md:scale-75">
            <KeyboardDemo />
          </div>
        </div>
        
        <div className="relative z-10">
          <TextReveal>
            ALFRED bridges the gap between natural language and precise UI interactions. Our Two-Model Pipeline separates task planning from visual execution, enabling anyone to automate complex computer tasks with simple voice commands.
          </TextReveal>
        </div>
      </div>

      {/* Infinite Slider - Tech Stack */}
      <div className="relative z-10 mt-16 w-full">
        <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">Powered By</p>
        <InfiniteSlider gap={48} className="py-12 w-screen">
          <div className="flex items-center gap-3 text-white">
            <Image src="/icons/gemini.png" alt="Gemini" width={40} height={40} />
            <span className="text-4xl font-bold">Gemini</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/icons/python.png" alt="Python" width={40} height={40} />
            <span className="text-4xl font-bold">FastSAM</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/icons/react.png" alt="React" width={40} height={40} />
            <span className="text-4xl font-bold">React Native</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/icons/flask.png" alt="Flask" width={40} height={40} />
            <span className="text-4xl font-bold">Flask</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/icons/socket .png" alt="Socket" width={40} height={40} />
            <span className="text-4xl font-bold">WebSocket</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/icons/python.png" alt="Python" width={40} height={40} />
            <span className="text-4xl font-bold">Python</span>
          </div>
        </InfiniteSlider>
      </div>
    </section>
  );
}
