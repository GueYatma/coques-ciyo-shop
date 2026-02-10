import { X } from 'lucide-react'

export type FiltersState = {
  query: string
  marque: string
  model: string
  category: string
  color: string
  priceMin: string
  priceMax: string
  withImage: boolean
  sort: string
}

export type FiltersOptions = {
  marques: string[]
  models: string[]
  categories: string[]
  colors: string[]
}

type FiltersPanelProps = {
  state: FiltersState
  options: FiltersOptions
  onChange: (next: Partial<FiltersState>) => void
  onReset: () => void
  onClose?: () => void
}

export const FiltersPanel = ({ state, options, onChange, onReset, onClose }: FiltersPanelProps) => {
  return (
    <div className="glass-panel rounded-3xl p-6 text-sm text-ink-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg">Filtres</h3>
        {onClose && (
          <button
            className="rounded-full border border-white/70 bg-white/70 p-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wide text-ink-600">Recherche</label>
          <input
            value={state.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Nom, référence..."
            className="input mt-2"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-ink-600">Marque</label>
          <select
            value={state.marque}
            onChange={(event) => onChange({ marque: event.target.value })}
            className="select mt-2"
          >
            <option value="">Toutes</option>
            {options.marques.map((marque) => (
              <option key={marque} value={marque}>
                {marque}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-ink-600">Modèle</label>
          <select
            value={state.model}
            onChange={(event) => onChange({ model: event.target.value })}
            className="select mt-2"
          >
            <option value="">Tous</option>
            {options.models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-ink-600">Catégorie</label>
          <select
            value={state.category}
            onChange={(event) => onChange({ category: event.target.value })}
            className="select mt-2"
          >
            <option value="">Toutes</option>
            {options.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-ink-600">Couleur</label>
          <select
            value={state.color}
            onChange={(event) => onChange({ color: event.target.value })}
            className="select mt-2"
          >
            <option value="">Toutes</option>
            {options.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs uppercase tracking-wide text-ink-600">Prix min</label>
            <input
              type="number"
              value={state.priceMin}
              onChange={(event) => onChange({ priceMin: event.target.value })}
              placeholder="0"
              className="input mt-2"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-ink-600">Prix max</label>
            <input
              type="number"
              value={state.priceMax}
              onChange={(event) => onChange({ priceMax: event.target.value })}
              placeholder="99"
              className="input mt-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3">
          <div>
            <p className="text-sm">Avec image</p>
            <p className="text-xs text-ink-600">Produits avec visuel</p>
          </div>
          <button
            className={`h-6 w-10 rounded-full transition ${
              state.withImage ? 'bg-neon-500/90' : 'bg-white/60'
            }`}
            onClick={() => onChange({ withImage: !state.withImage })}
          >
            <span
              className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white transition ${
                state.withImage ? 'translate-x-4' : ''
              }`}
            />
          </button>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-ink-600">Tri</label>
          <select
            value={state.sort}
            onChange={(event) => onChange({ sort: event.target.value })}
            className="select mt-2"
          >
            <option value="featured">Mis en avant</option>
            <option value="newest">Nouveautés</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>

        <button className="btn-ghost w-full" onClick={onReset}>
          Réinitialiser
        </button>
      </div>
    </div>
  )
}
