"use client"

import React, { useState, useEffect } from 'react'
import { Monitor, Circle, Activity, Cpu, HardDrive, Wifi } from 'lucide-react'

const GUACAMOLE_URL = process.env.NEXT_PUBLIC_GUACAMOLE_URL || 'https://evaluate-needs-semiconductor-understood.trycloudflare.com/guacamole/'

export default function LivePreviewPortal() {
  const [isConnected, setIsConnected] = useState(true)
  const [cpuUsage, setCpuUsage] = useState(23)
  const [memoryUsage, setMemoryUsage] = useState(67)
  const [networkActivity, setNetworkActivity] = useState(45)

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
    <div className="flex flex-col h-full bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg font-semibold text-white">ALFRED Live Control</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700/50 border border-gray-600">
            <Circle className={`w-2 h-2 fill-current ${isConnected ? 'text-green-500 animate-pulse' : 'text-red-500'}`} />
            <span className="text-xs text-gray-300">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-400">
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
      <div className="flex items-center justify-between px-6 py-2 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-300">Live Desktop Feed</span>
          </div>
          <div className="text-xs text-gray-400">Resolution: 1920x1080</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400">Active Session</span>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 relative bg-black">
        <iframe
          src={GUACAMOLE_URL}
          className="w-full h-full border-none"
          title="Live Desktop Preview"
          allow="clipboard-read; clipboard-write"
        />
        
        {/* Overlay indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Recording</span>
            </div>
          </div>
        </div>

        {/* Performance overlay */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">CPU:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${cpuUsage}%` }}
                  />
                </div>
                <span className="text-white w-8 text-right">{cpuUsage.toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">RAM:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${memoryUsage}%` }}
                  />
                </div>
                <span className="text-white w-8 text-right">{memoryUsage.toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">NET:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-1000"
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
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-600">
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>AI Control Active</span>
              </div>
              <div className="w-px h-3 bg-gray-600" />
              <span>Session: 00:42:15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}