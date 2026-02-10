import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { ProductImage } from '@/components/ProductImage'

const formatPrice = (value: number) => value.toFixed(2).replace('.', ',')

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-neon-500" />
        <h1 className="mt-4 font-display text-2xl">Votre panier est vide</h1>
        <p className="mt-2 text-sm text-ink-600">
          Ajoutez des coques premium depuis le catalogue.
        </p>
        <Link to="/catalogue" className="btn-primary mt-6">
          Explorer le catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-3xl">Panier</h1>
      <p className="mt-2 text-sm text-ink-600">{totalItems} articles</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.reference} className="glass-card flex gap-4 rounded-3xl p-4">
              <div className="h-28 w-24">
                <ProductImage src={item.img_url} alt={item.name} />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs text-ink-500">Réf: {item.reference}</p>
                  <p className="font-display text-lg">{item.name}</p>
                  <p className="mt-2 text-sm text-ink-600">
                    {formatPrice(item.prix_solde ?? item.prix_normal)} €
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2">
                    <button
                      onClick={() => updateQuantity(item.reference, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[24px] text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.reference, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 text-sm text-ember-500"
                    onClick={() => removeItem(item.reference)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel h-fit rounded-3xl p-6">
          <h2 className="font-display text-xl">Résumé</h2>
          <div className="mt-4 space-y-2 text-sm text-ink-600">
            <div className="flex items-center justify-between">
              <span>Sous-total</span>
              <span>{formatPrice(totalPrice)} €</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Taxes</span>
              <span>Incluses</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/50 pt-4 text-lg">
            <span>Total</span>
            <span className="font-semibold">{formatPrice(totalPrice)} €</span>
          </div>
          <Link to="/checkout" className="btn-primary mt-6 w-full">
            Passer au checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
