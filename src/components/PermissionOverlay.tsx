"use client"

import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react'

interface PermissionOverlayProps {
  operation: string
  details: string
  onApprove: () => void
  onDecline: () => void
}

export default function PermissionOverlay({ 
  operation, 
  details, 
  onApprove, 
  onDecline 
}: PermissionOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-red-500/50 rounded-lg p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-bold text-red-400 uppercase tracking-wider">
            Security Alert
          </h3>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-zinc-300 mb-2">
            AI requesting permission for:
          </p>
          <p className="text-white font-semibold mb-3">{operation}</p>
          <p className="text-xs text-zinc-400 bg-zinc-800/50 p-3 rounded border border-zinc-700">
            {details}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded hover:bg-red-500/30 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase">Decline</span>
          </button>
          <button
            onClick={onApprove}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded hover:bg-emerald-500/30 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase">Approve</span>
          </button>
        </div>
      </div>
    </div>
  )
}