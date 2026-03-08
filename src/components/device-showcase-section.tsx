"use client"

import { Safari } from "@/components/ui/safari"
import { Iphone } from "@/components/ui/iphone"
import { MobileChatInterface } from "@/components/mobile-chat-interface"
import AlfredDemoPortal from "@/components/AlfredDemoPortal"

export function DeviceShowcaseSection() {
  return (
    <section className="py-20 px-16 bg-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-stretch h-full">
          {/* iPhone on the left - 25% width */}
          <div className="lg:col-span-3 flex justify-start lg:justify-start relative">
            <div className="w-full max-w-none flex items-center justify-center lg:absolute lg:-left-20">
              <div className="relative">
                <Iphone 
                  className="w-full h-auto" 
                  style={{ height: '700px', width: 'auto' }} 
                />
                {/* Chat interface positioned exactly where iPhone screen is */}
                <div 
                  className="absolute z-20 overflow-hidden"
                  style={{
                    left: '4.9%',
                    top: '2.18%', 
                    width: '89.95%',
                    height: '95.64%',
                    borderRadius: '12.88% / 6.61%'
                  }}
                >
                  <MobileChatInterface />
                </div>
              </div>
            </div>
          </div>
          
          {/* Safari on the right - 75% width */}
          <div className="lg:col-span-9 flex justify-center lg:justify-start">
            <div className="w-full max-w-none flex items-center justify-center">
              <div className="relative">
                <Safari 
                  url="https://alfred-portal.ai"
                  className="w-full h-auto"
                  style={{ height: '700px', width: 'auto' }}
                />
                {/* Custom iframe content positioned exactly where Safari screen is */}
                <div 
                  className="absolute z-20 overflow-hidden"
                  style={{
                    left: '0.08%',
                    top: '6.9%', 
                    width: '99.75%',
                    height: '93%',
                    borderRadius: '0 0 11px 11px'
                  }}
                >
                  <div className="flex flex-col h-full bg-zinc-950 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 border-b border-zinc-800">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Live Feed - EC2 Puppet Control
                      </span>
                    </div>
                    <div className="flex-1 relative group">
                      <iframe
                        src="https://evaluate-needs-semiconductor-understood.trycloudflare.com/guacamole/"
                        className="w-full h-full border-none grayscale-[0.2] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        title="Puppet View"
                        allow="clipboard-read; clipboard-write"
                      />
                      {/* Scanline Overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}