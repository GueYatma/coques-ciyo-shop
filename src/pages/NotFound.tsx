import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-neon-500">404</p>
      <h1 className="mt-2 font-display text-4xl">Page introuvable</h1>
      <p className="mt-4 text-sm text-ink-600">
        La page demandée n&#39;existe pas. Revenez au catalogue pour continuer.
      </p>
      <Link to="/catalogue" className="btn-primary mt-6">
        Retour au catalogue
      </Link>
    </div>
  )
}
