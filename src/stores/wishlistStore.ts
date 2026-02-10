import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WishlistState = {
  items: string[]
  toggle: (reference: string) => void
  has: (reference: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (reference) => {
        const items = get().items.includes(reference)
          ? get().items.filter((item) => item !== reference)
          : [...get().items, reference]
        set({ items })
      },
      has: (reference) => get().items.includes(reference),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'ciyo-wishlist',
    }
  )
)
