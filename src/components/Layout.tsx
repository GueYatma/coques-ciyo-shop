import { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { FooterRail } from '@/components/FooterRail'
import { useLocation } from 'react-router-dom'
import { PromoBanner } from '@/components/PromoBanner'

const primaryNav = [
  { label: 'Accueil', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Mes commandes', to: '/commandes' },
  { label: 'Mon compte', to: '/compte' },
]

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const totalItems = useCartStore((state) => state.totalItems)
  const wishlistCount = useWishlistStore((state) => state.items.length)
  const location = useLocation()
  const showBanner = location.pathname === '/' || location.pathname === '/catalogue'

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showBanner && <PromoBanner />}
      <div className="blur-blob bg-neon-500/30 -top-16 -left-24" />
      <div className="blur-blob bg-ember-500/25 top-1/4 -right-32" />
      <div className="blur-blob bg-neon-300/30 bottom-[-140px] left-1/3" />
      <div className="noise" />

      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:py-4">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70">
              <span className="font-display text-base">N</span>
            </div>
            <div>
              <p className="font-display text-lg">Atelier Novaa</p>
              <p className="text-xs text-ink-600">Coques premium</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? 'text-neon-500' : 'text-ink-700 hover:text-ink-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <div className="relative hidden lg:flex">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-ember-500 px-2 py-0.5 text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </div>
            <Link to="/panier" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-neon-500 px-2 py-0.5 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="relative md:hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white/90 to-transparent" />
          <div className="flex items-center gap-3 overflow-x-auto px-6 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex-shrink-0 rounded-full border px-4 py-2 transition ${
                    isActive
                      ? 'border-neon-400/60 bg-neon-500/15 text-neon-500'
                      : 'border-white/70 bg-white/70 text-ink-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/panier"
              className={({ isActive }) =>
                `flex-shrink-0 rounded-full border px-4 py-2 transition ${
                  isActive
                    ? 'border-neon-400/60 bg-neon-500/15 text-neon-500'
                    : 'border-white/70 bg-white/70 text-ink-700'
                }`
              }
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Panier
                {totalItems > 0 && (
                  <span className="rounded-full bg-neon-500 px-2 py-0.5 text-[10px] text-white">
                    {totalItems}
                  </span>
                )}
              </span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-24 md:pb-0">{children}</main>

      <FooterRail />

      <footer className="border-t border-white/50 bg-white/60 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
          <div>
            <h3 className="font-display text-lg">Atelier Novaa</h3>
            <p className="mt-2 text-sm text-ink-600">
              Boutique premium de coques de téléphone. Démo V1 pensée pour évoluer vers un
              e-commerce complet (n8n + Postgres + paiements).
            </p>
          </div>
          <div className="space-y-2 text-sm text-ink-700">
            <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Infos</p>
            <NavLink to="/a-propos" className="block hover:text-ink-900">
              À propos
            </NavLink>
            <NavLink to="/contact" className="block hover:text-ink-900">
              Contact
            </NavLink>
            <NavLink to="/faq" className="block hover:text-ink-900">
              FAQ
            </NavLink>
          </div>
          <div className="space-y-2 text-sm text-ink-700">
            <p>support@ciyo.shop</p>
            <p>+33 1 80 88 99 00</p>
            <p>Paris · France</p>
          </div>
          <div className="space-y-2 text-sm text-ink-700">
            <p>Livraison 48h premium</p>
            <p>Retours sous 30 jours</p>
            <p>Paiement sécurisé (mock)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
