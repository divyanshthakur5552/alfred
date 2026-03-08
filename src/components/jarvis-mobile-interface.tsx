"use client"

import React, { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Send, Mic, Circle, Activity, ShieldAlert } from 'lucide-react'
import PermissionOverlay from './PermissionOverlay'

const GUACAMOLE_URL = process.env.NEXT_PUBLIC_GUACAMOLE_URL || 'https://evaluate-needs-semiconductor-understood.trycloudflare.com/guacamole/'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://13.218.156.16:5000'
const DEVICE_ID = process.env.NEXT_PUBLIC_DEVICE_ID || 'desktop_e054d2c4a0684c98'

interface Message {
  text: string
  sender: 'user' | 'system' | 'bot'
  timestamp: number
}

interface PendingPermission {
  requestId: string
  operation: string
  details: string
}

export function JarvisMobileInterface() {
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { text: "System: Standing by for commands...", sender: "system", timestamp: Date.now() }
  ])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(true) // Start as connected like JarvisDemoPortal
  const [showDesktop, setShowDesktop] = useState(false)
  const [pendingPermission, setPendingPermission] = useState<PendingPermission | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Establish Socket.IO connection - JARVIS only
  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    })

    newSocket.on('connect', () => {
      console.log('Connected to JARVIS Brain')
      setIsConnected(true)
      setMessages(prev => [...prev, {
        text: "System: Neural Link Established.",
        sender: "system",
        timestamp: Date.now()
      }])
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from JARVIS Brain')
      setIsConnected(false)
      setMessages(prev => [...prev, {
        text: "System: Neural Link Severed.",
        sender: "system",
        timestamp: Date.now()
      }])
    })

    newSocket.on('jarvis_status', (data) => {
      console.log('📨 Received jarvis_status:', data)
      if (data.message) {
        setMessages(prev => [...prev, {
          text: `JARVIS: ${data.message}${data.progress ? ` (${data.progress}%)` : ''}`,
          sender: "bot",
          timestamp: Date.now()
        }])
      }
    })

    newSocket.on('permission_request', (data) => {
      setPendingPermission({
        requestId: data.requestId,
        operation: data.operation,
        details: data.details
      })
      setMessages(prev => [...prev, {
        text: `SECURITY ALERT: AI requesting permission for ${data.operation}`,
        sender: "system",
        timestamp: Date.now()
      }])
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const handleSendMessage = () => {
    if (!inputText.trim()) {
      console.log('⚠️ Command is empty')
      return
    }
    if (!socket) {
      console.log('❌ Socket is null')
      return
    }

    console.log('🔵 Socket connected:', socket.connected)
    console.log('🔵 Socket ID:', socket.id)
    console.log('🔵 Sending command:', inputText, 'to device:', DEVICE_ID)

    // Emit event to backend - exact same as JarvisDemoPortal
    socket.emit('process_instruction', {
      text: inputText,
      deviceId: DEVICE_ID,
      timestamp: Date.now()
    }, (response: any) => {
      console.log('📨 Server acknowledged:', response)
    })

    console.log('✅ Command emitted via socket')
    setMessages(prev => [...prev, { 
      text: inputText, 
      sender: "user", 
      timestamp: Date.now() 
    }])

    // Auto-show desktop for certain commands
    if (inputText.toLowerCase().includes('desktop') || 
        inputText.toLowerCase().includes('screen') ||
        inputText.toLowerCase().includes('show')) {
      setShowDesktop(true)
    }

    setInputText('')
  }

  const handlePermissionResponse = (approved: boolean) => {
    if (!socket || !pendingPermission) return

    socket.emit('permission_response', {
      requestId: pendingPermission.requestId,
      approved,
      timestamp: Date.now()
    })

    setMessages(prev => [...prev, {
      text: `Security: Permission ${approved ? 'APPROVED' : 'DECLINED'}`,
      sender: "system",
      timestamp: Date.now()
    }])

    setPendingPermission(null)
  }

  if (showDesktop) {
    return (
      <div className="flex flex-col h-full bg-black text-white font-mono overflow-hidden relative">
        {/* Permission overlay for desktop view */}
        {pendingPermission && (
          <PermissionOverlay
            operation={pendingPermission.operation}
            details={pendingPermission.details}
            onApprove={() => handlePermissionResponse(true)}
            onDecline={() => handlePermissionResponse(false)}
          />
        )}
        
        {/* Mobile header */}
        <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/50 border-b border-zinc-800">
          <button 
            onClick={() => setShowDesktop(false)}
            className="text-emerald-400 text-sm font-medium uppercase tracking-wider"
          >
            ← Console
          </button>
          <div className="flex items-center gap-2">
            <Circle className={`w-2 h-2 fill-current ${isConnected ? 'text-emerald-500 animate-pulse' : 'text-red-500'}`} />
            <span className="text-xs text-zinc-400 uppercase tracking-widest">
              {isConnected ? 'Neural Link Established' : 'Link Offline'}
            </span>
          </div>
        </div>

        {/* Live Feed Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 border-b border-zinc-800">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Live Feed - EC2 Puppet Control</span>
        </div>

        {/* Live desktop view with scanline overlay */}
        <div className="flex-1 relative group">
          <iframe
            src={GUACAMOLE_URL}
            className="w-full h-full border-none grayscale-[0.2] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            title="Puppet View"
            allow="clipboard-read; clipboard-write"
          />
          
          {/* Scanline Overlay - exact same as JarvisDemoPortal */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-black text-white font-mono overflow-hidden relative">
      {/* Permission overlay for chat view */}
      {pendingPermission && (
        <PermissionOverlay
          operation={pendingPermission.operation}
          details={pendingPermission.details}
          onApprove={() => handlePermissionResponse(true)}
          onDecline={() => handlePermissionResponse(false)}
        />
      )}

      {/* Mobile header - JARVIS style */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">J</span>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-tighter">JARVIS <span className="text-zinc-500 font-light text-xs">Mobile v4.0</span></h3>
            <div className="flex items-center gap-1">
              <Circle className={`w-2 h-2 fill-current ${isConnected ? 'text-emerald-500 animate-pulse' : 'text-red-500'}`} />
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                {isConnected ? 'Neural Link Established' : 'Link Offline'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowDesktop(true)}
          suppressHydrationWarning={true}
          className="px-3 py-1 bg-emerald-600 text-white text-xs rounded uppercase tracking-wider hover:bg-emerald-500 transition-colors"
        >
          Live Feed
        </button>
      </div>

      {/* Messages - Command Console Style */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/30 scrollbar-hide"
      >
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] px-3 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-zinc-100 text-black rounded-tr-none'
                  : message.sender === 'system'
                  ? 'bg-zinc-800/50 text-zinc-400 border border-zinc-700 italic text-xs'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-zinc-600' : 'text-gray-400'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input area - Command Console Style */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/20">
        <div className="relative group">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="EXECUTE SEQUENCE..."
            suppressHydrationWarning={true}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600 uppercase tracking-wider"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            suppressHydrationWarning={true}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}