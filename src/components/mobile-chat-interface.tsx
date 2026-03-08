"use client"

import React, { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Send, Circle } from 'lucide-react'
import PermissionOverlay from '@/components/PermissionOverlay'

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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://13.218.156.16:5000'
const DEVICE_ID = process.env.NEXT_PUBLIC_DEVICE_ID || 'desktop_e054d2c4a0684c98'

export function MobileChatInterface() {
  const [command, setCommand] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { text: "System: Standing by for commands...", sender: "system", timestamp: Date.now() }
  ])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [pendingPermission, setPendingPermission] = useState<PendingPermission | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Socket connection
  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      setMessages(prev => [...prev, {
        text: "System: Neural Link Established.",
        sender: "system",
        timestamp: Date.now()
      }])
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
      setMessages(prev => [...prev, {
        text: "System: Neural Link Severed.",
        sender: "system",
        timestamp: Date.now()
      }])
    })

    newSocket.on('alfred_status', (data) => {
      if (data.message) {
        setMessages(prev => [...prev, {
          text: `ALFRED: ${data.message}${data.progress ? ` (${data.progress}%)` : ''}`,
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
    return () => newSocket.close()
  }, [])

  const handleSendCommand = () => {
    if (!command.trim() || !socket) return

    socket.emit('process_instruction', {
      text: command,
      deviceId: DEVICE_ID,
      timestamp: Date.now()
    })

    setMessages(prev => [...prev, { text: command, sender: "user", timestamp: Date.now() }])
    setCommand("")
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

  return (
    <div className="flex flex-col h-full bg-black text-white font-mono overflow-hidden relative">
      {pendingPermission && (
        <PermissionOverlay
          operation={pendingPermission.operation}
          details={pendingPermission.details}
          onApprove={() => handlePermissionResponse(true)}
          onDecline={() => handlePermissionResponse(false)}
        />
      )}

      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">J</span>
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">ALFRED</h1>
            <div className="flex items-center gap-1">
              <Circle className={`w-2 h-2 fill-current ${isConnected ? 'text-emerald-500 animate-pulse' : 'text-red-500'}`} />
              <span className="text-xs text-zinc-400">{isConnected ? 'Connected' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[85%] px-3 py-2 rounded-lg text-xs ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white rounded-tr-none'
                : msg.sender === 'system'
                ? 'bg-zinc-800/50 text-zinc-400 border border-zinc-700 italic'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/20">
        <div className="relative">
          <input
            type="text"
            placeholder="EXECUTE SEQUENCE..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600 uppercase tracking-wider"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendCommand()}
          />
          <button
            onClick={handleSendCommand}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}