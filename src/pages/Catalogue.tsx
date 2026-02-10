import { useEffect, useMemo, useRef, useState } from 'react'
import { Filter, LayoutGrid, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiltersPanel, FiltersOptions, FiltersState } from '@/components/FiltersPanel'
import { ProductCard } from '@/components/ProductCard'
import { ProductService } from '@/services/ProductService'
import { Product, ProductSearchParams } from '@/types/product'
import { useUiStore } from '@/stores/uiStore'

const initialFilters: FiltersState = {
  query: '',
  marque: '',
  model: '',
  category: '',
  color: '',
  priceMin: '',
  priceMax: '',
  withImage: false,
  sort: 'featured',
}

export default function Catalogue() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters)
  const [options, setOptions] = useState<FiltersOptions>({
    marques: [],
    models: [],
    categories: [],
    colors: [],
  })
  const [results, setResults] = useState<Product[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { catalogView, setCatalogView } = useUiStore()
  const drawerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ProductService.getProducts().then((products) => {
      const unique = (items: Array<string | null | undefined>) =>
        Array.from(new Set(items.filter(Boolean) as string[])).sort()
      setOptions({
        marques: unique(products.map((product) => product.marque)),
        models: unique(products.map((product) => product.model)),
        categories: unique(products.map((product) => product.category)),
        colors: unique(products.map((product) => product.color)),
      })
    })
  }, [])

  useEffect(() => {
    ProductService.searchProducts({
      query: filters.query,
      marque: filters.marque || undefined,
      model: filters.model || undefined,
      category: filters.category || undefined,
      color: filters.color || undefined,
      priceMin: filters.priceMin ? Number(filters.priceMin) : undefined,
      priceMax: filters.priceMax ? Number(filters.priceMax) : undefined,
      withImage: filters.withImage,
      sort: filters.sort as ProductSearchParams['sort'],
    }).then(setResults)
  }, [filters])

  useEffect(() => {
    if (!filtersOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFiltersOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    const focusTimer = window.setTimeout(() => drawerRef.current?.focus(), 0)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [filtersOpen])

  const summary = useMemo(
    () =>
      [filters.marque, filters.model, filters.category, filters.color]
        .filter(Boolean)
        .join(' · '),
    [filters]
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Catalogue</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">Catalogue premium</h1>
          {summary && <p className="mt-2 text-sm text-ink-600">{summary}</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="btn-ghost hidden md:inline-flex lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filtres
          </button>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                catalogView === 'grid'
                  ? 'border-neon-400/40 bg-neon-500/15'
                  : 'border-white/70 bg-white/70'
              }`}
              onClick={() => setCatalogView('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                catalogView === 'list'
                  ? 'border-neon-400/40 bg-neon-500/15'
                  : 'border-white/70 bg-white/70'
              }`}
              onClick={() => setCatalogView('list')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FiltersPanel
            state={filters}
            options={options}
            onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
            onReset={() => setFilters(initialFilters)}
          />
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between text-sm text-ink-600">
            <span>{results.length} produits</span>
            <span>Tri: {filters.sort}</span>
          </div>

          {results.length === 0 ? (
            <div className="glass-card rounded-3xl p-10 text-center">
              <p className="font-display text-xl">Aucun produit trouvé</p>
              <p className="mt-2 text-sm text-ink-600">
                Essayez d&#39;ajuster vos filtres ou la recherche.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                catalogView === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {results.map((product) => (
                <ProductCard key={product.reference} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        className="fixed left-0 top-1/2 z-40 -translate-y-1/2 -translate-x-3 rounded-r-2xl border border-white/60 bg-white/70 px-3 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] shadow-glass backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-400/60 md:hidden"
        onClick={() => setFiltersOpen(true)}
        aria-expanded={filtersOpen}
        aria-controls="mobile-filters"
        aria-label="Ouvrir les filtres"
      >
        <div className="flex flex-col items-center gap-2 text-ink-700">
          <Filter className="h-4 w-4" />
          <span className="writing-vertical">Filtres</span>
        </div>
      </button>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-start bg-white/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFiltersOpen(false)}
          >
            <motion.div
              id="mobile-filters"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Filtres catalogue"
              tabIndex={-1}
              className="glass-panel h-full w-[86vw] max-w-[360px] overflow-y-auto rounded-r-3xl rounded-l-none p-6 outline-none"
              initial={{ x: -360 }}
              animate={{ x: 0 }}
              exit={{ x: -360 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <FiltersPanel
                state={filters}
                options={options}
                onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
                onReset={() => setFilters(initialFilters)}
                onClose={() => setFiltersOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
