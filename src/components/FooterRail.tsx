import { useState } from 'react'
import { ArrowUpRight, Instagram, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BottomSheet } from '@/components/BottomSheet'

export const FooterRail = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] shadow-glass backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-400/60 md:hidden"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-infos"
      >
        Infos
        <ArrowUpRight className="h-4 w-4" />
      </button>

      <BottomSheet open={open} title="Infos" onClose={() => setOpen(false)}>
        <div id="mobile-infos" className="space-y-4 text-sm">
          <div className="grid gap-2">
            <Link to="/a-propos" className="btn-ghost w-full justify-between" onClick={() => setOpen(false)}>
              À propos <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost w-full justify-between" onClick={() => setOpen(false)}>
              Contact <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/faq" className="btn-ghost w-full justify-between" onClick={() => setOpen(false)}>
              FAQ <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Newsletter</p>
            <div className="mt-3 flex items-center gap-2">
              <input className="input" placeholder="Email" />
              <button className="btn-primary">OK</button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-ink-600">
            <Mail className="h-4 w-4" />
            support@ciyo.shop
          </div>
          <div className="flex items-center gap-3 text-ink-600">
            <Instagram className="h-4 w-4" />
            @ciyo.shop
          </div>
        </div>
      </BottomSheet>
    </>
  )
}
