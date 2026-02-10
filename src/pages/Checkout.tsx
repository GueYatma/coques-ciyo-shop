import { ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

const formatPrice = (value: number) => value.toFixed(2).replace('.', ',')

export default function Checkout() {
  const totalPrice = useCartStore((state) => state.totalPrice)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Checkout</p>
          <h1 className="mt-2 font-display text-3xl">Finaliser la commande</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-600">
          <ShieldCheck className="h-4 w-4 text-neon-500" />
          Paiement sécurisé (mock)
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="font-display text-xl">Adresse</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="input" placeholder="Prénom" />
              <input className="input" placeholder="Nom" />
              <input className="input md:col-span-2" placeholder="Adresse" />
              <input className="input" placeholder="Code postal" />
              <input className="input" placeholder="Ville" />
              <input className="input md:col-span-2" placeholder="Email" />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <h2 className="font-display text-xl">Livraison</h2>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 p-4">
                <span>Express 48h</span>
                <span>Gratuit</span>
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 p-4">
                <span>Premium 24h</span>
                <span>+9,90 €</span>
              </label>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <h2 className="font-display text-xl">Paiement</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <button className="btn-ghost">Carte bancaire (Stripe)</button>
              <button className="btn-ghost">PayPal</button>
            </div>
            <p className="mt-4 text-xs text-ink-600">
              Les boutons sont en mode mock. Ils seront connectés à Stripe et PayPal.
            </p>
          </div>
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
          <button className="btn-primary mt-6 w-full">Confirmer (mock)</button>
        </div>
      </div>
    </div>
  )
}
