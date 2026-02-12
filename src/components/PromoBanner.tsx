import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-neon-500 to-ember-400 text-white"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <div className="flex-1 text-center text-xs font-bold uppercase tracking-widest md:text-sm">
            <span>✨ Livraison gratuite</span>
            <span className="hidden opacity-80 md:inline"> : offre limitée sur toutes les commandes !</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/40"
            aria-label="Fermer la bannière"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
