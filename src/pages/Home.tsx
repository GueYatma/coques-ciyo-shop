import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/ProductCard'
import { SectionHeading } from '@/components/SectionHeading'
import { ProductService } from '@/services/ProductService'
import { Product } from '@/types/product'

const perks = [
  {
    title: 'Protection premium',
    description: 'Absorption des chocs et finitions soyeuses pour un rendu impeccable.',
    icon: ShieldCheck,
  },
  {
    title: 'Design signature',
    description: 'Glassmorphism inspiré des marques tech haut de gamme.',
    icon: Sparkles,
  },
  {
    title: 'Expédition express',
    description: 'Livraison premium sous 48h partout en France.',
    icon: Truck,
  },
]

const reviews = [
  {
    name: 'Camille R.',
    role: 'iPhone 15 Pro',
    quote:
      'Le rendu est vraiment premium. Même sans image produit, tout reste clair et élégant.',
  },
  {
    name: 'Matteo L.',
    role: 'Galaxy S24',
    quote: 'Un design ultra propre, parfait pour une démo client.',
  },
  {
    name: 'Sarah B.',
    role: 'Pixel 8',
    quote: 'Navigation fluide et fiches produits très détaillées.',
  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ProductService.getProducts().then(setProducts)
  }, [])

  const featured = useMemo(
    () => products.filter((product) => product.produit_mis_en_avant).slice(0, 4),
    [products]
  )

  const categories = useMemo(() => {
    const set = new Set(products.map((product) => product.category).filter(Boolean))
    return Array.from(set).slice(0, 4)
  }, [products])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge rounded-full border border-white/60 bg-white/40 px-4 py-1 text-xs font-bold uppercase tracking-wide text-ink-700 shadow-glass backdrop-blur">
              DEPLOY TEST ✅
            </span>
            <span className="badge bg-white/70 text-neon-500">CIYO premium lab</span>
          </div>
          <h1 className="text-shadow font-display text-4xl leading-tight md:text-5xl">
            L&#39;expérience e-commerce premium pour les coques de téléphone.
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Dernier déploiement : 11/02/2026 01:32
          </p>
          <p className="text-sm text-ink-600">
            V1 frontend pensée pour intégrer n8n, PostgreSQL et des paiements Stripe/PayPal.
            Les données sont mockées, mais prêtes pour un catalogue réel.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/catalogue" className="btn-primary">
              Explorer le catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Planifier une démo
            </Link>
          </div>
        </div>
        <div className="glass-card relative rounded-[32px] p-6 shadow-float">
          <div className="absolute -top-10 right-6 rounded-3xl border border-white/70 bg-white/70 px-4 py-2 text-xs">
            30+ produits mock
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/70 bg-white/70 p-4">
              <p className="text-xs uppercase text-ink-500">Taux de conversion</p>
              <p className="mt-2 font-display text-3xl">+28%</p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/70 p-4">
              <p className="text-xs uppercase text-ink-500">Panier moyen</p>
              <p className="mt-2 font-display text-3xl">42,90 €</p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/70 p-4">
              <p className="text-xs uppercase text-ink-500">Satisfaction</p>
              <p className="mt-2 font-display text-3xl">4,8 / 5</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          title="Catégories signatures"
          subtitle="Les collections les plus demandées pour une boutique premium."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category}
              className="glass-card rounded-3xl p-6 text-lg font-semibold shadow-glass"
            >
              <p className="text-sm uppercase text-ink-500">Collection</p>
              <p className="mt-3 font-display text-2xl">{category}</p>
              <Link to="/catalogue" className="mt-6 inline-flex items-center gap-2 text-sm">
                Voir la sélection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          title="Best sellers"
          subtitle="Les produits mis en avant sont triés en priorité dans le catalogue."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.reference} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-3">
        {perks.map((perk) => {
          const Icon = perk.icon
          return (
            <div key={perk.title} className="glass-card rounded-3xl p-6 shadow-glass">
              <Icon className="h-6 w-6 text-neon-500" />
              <h3 className="mt-4 font-display text-xl">{perk.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{perk.description}</p>
            </div>
          )
        })}
      </section>

      <section className="mt-20">
        <SectionHeading
          title="Avis clients"
          subtitle="Mock d'avis pour enrichir les fiches produits et la crédibilité UX."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="glass-card rounded-3xl p-6 shadow-glass">
              <p className="text-sm text-ink-600">{review.quote}</p>
              <div className="mt-6">
                <p className="font-display text-lg">{review.name}</p>
                <p className="text-xs text-ink-500">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
