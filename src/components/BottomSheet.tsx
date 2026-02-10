import { ReactNode, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type BottomSheetProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export const BottomSheet = ({ open, title, onClose, children }: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    const focusTimer = window.setTimeout(() => sheetRef.current?.focus(), 0)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-white/40 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="glass-panel w-full max-w-[520px] rounded-t-3xl p-6 outline-none"
            initial={{ y: 320 }}
            animate={{ y: 0 }}
            exit={{ y: 320 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.y > 120) onClose()
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">{title}</h3>
              <button
                className="rounded-full border border-white/70 bg-white/70 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-400/60"
                onClick={onClose}
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
