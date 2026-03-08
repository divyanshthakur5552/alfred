"use client"

import React, { useState, useEffect } from 'react'
import { Monitor, Circle, Activity, Cpu, HardDrive, Wifi } from 'lucide-react'

const GUACAMOLE_URL = process.env.NEXT_PUBLIC_GUACAMOLE_URL || 'https://evaluate-needs-semiconductor-understood.trycloudflare.com/guacamole/'

export default function LivePreviewPortal() {
  const [isConnected, setIsConnected] = useState(false)
  const [cpuUsage, setCpuUsage] = useState(23)
  const [memoryUsage, setMemoryUsage] = useState(67)
  const [networkActivity, setNetworkActivity] = useState(45)

  // Simulate connection establishment
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10)))
      setMemoryUsage(prev => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 8)))
      setNetworkActivity(prev => Math.max(5, Math.min(100, prev + (Math.random() - 0.5) * 15)))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full bg-black text-white font-mono overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-semibold text-white uppercase tracking-tighter">JARVIS Live Control</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700">
            <Circle className={`w-2 h-2 fill-current ${isConnected ? 'text-emerald-500 animate-pulse' : 'text-red-500'}`} />
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
              {isConnected ? 'Neural Link Established' : 'Link Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>{cpuUsage.toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>{memoryUsage.toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            <span>{networkActivity.toFixed(0)}%</span>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-zinc-900/30 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Live Feed - EC2 Puppet Control</span>
          </div>
          <div className="text-xs text-zinc-400 uppercase">Resolution: 1920x1080</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400 uppercase tracking-wider">Active Session</span>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 relative bg-zinc-950 group">
        <iframe
          src={GUACAMOLE_URL}
          className="w-full h-full border-none grayscale-[0.2] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          title="Puppet View"
          allow="clipboard-read; clipboard-write"
        />
        
        {/* Scanline Overlay - exact same as JarvisDemoPortal */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10" />
        
        {/* Overlay indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-600">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="uppercase tracking-wider">Recording</span>
            </div>
          </div>
        </div>

        {/* Performance overlay */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-600">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400 uppercase">CPU:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${cpuUsage}%` }}
                  />
                </div>
                <span className="text-white w-8 text-right">{cpuUsage.toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400 uppercase">RAM:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${memoryUsage}%` }}
                  />
                </div>
                <span className="text-white w-8 text-right">{memoryUsage.toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400 uppercase">NET:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${networkActivity}%` }}
                  />
                </div>
                <span className="text-white w-8 text-right">{networkActivity.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-zinc-600">
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="uppercase tracking-wider">AI Control Active</span>
              </div>
              <div className="w-px h-3 bg-zinc-600" />
              <span>Session: 00:42:15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}