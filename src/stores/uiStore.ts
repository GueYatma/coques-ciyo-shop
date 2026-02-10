import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UiState = {
  catalogView: 'grid' | 'list'
  setCatalogView: (view: 'grid' | 'list') => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      catalogView: 'grid',
      setCatalogView: (view) => set({ catalogView: view }),
    }),
    {
      name: 'ciyo-ui',
    }
  )
)
