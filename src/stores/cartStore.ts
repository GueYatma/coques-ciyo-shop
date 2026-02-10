import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'
import { ProductService } from '@/services/ProductService'

export type CartItem = {
  reference: string
  name: string
  prix_normal: number
  prix_solde?: number | null
  quantity: number
  img_url?: string | null
  slug: string
}

type CartState = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (reference: string) => void
  updateQuantity: (reference: string, quantity: number) => void
  clear: () => void
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const unit = item.prix_solde ?? item.prix_normal
    return sum + unit * item.quantity
  }, 0)
  return { totalItems, totalPrice }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (product, quantity = 1) => {
        const slug = ProductService.getSlug(product)
        const existing = get().items.find((item) => item.reference === product.reference)
        const nextItems = existing
          ? get().items.map((item) =>
              item.reference === product.reference
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          : [
              ...get().items,
              {
                reference: product.reference,
                name: product.name,
                prix_normal: product.prix_normal,
                prix_solde: product.prix_solde,
                quantity,
                img_url: ProductService.getPrimaryImage(product),
                slug,
              },
            ]
        const totals = calculateTotals(nextItems)
        set({ items: nextItems, ...totals })
      },
      removeItem: (reference) => {
        const nextItems = get().items.filter((item) => item.reference !== reference)
        const totals = calculateTotals(nextItems)
        set({ items: nextItems, ...totals })
      },
      updateQuantity: (reference, quantity) => {
        const nextItems = get().items
          .map((item) =>
            item.reference === reference
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
          .filter((item) => item.quantity > 0)
        const totals = calculateTotals(nextItems)
        set({ items: nextItems, ...totals })
      },
      clear: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'ciyo-cart',
    }
  )
)
