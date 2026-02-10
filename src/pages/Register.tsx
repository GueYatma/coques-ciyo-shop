import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Inscription</p>
      <h1 className="mt-2 font-display text-3xl">Créer un compte</h1>
      <div className="glass-panel mt-6 rounded-3xl p-6">
        <div className="space-y-4">
          <input className="input" placeholder="Prénom" />
          <input className="input" placeholder="Nom" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Mot de passe" type="password" />
          <button className="btn-primary w-full">Inscription (mock)</button>
          <p className="text-center text-xs text-ink-600">
            Déjà inscrit ? <Link to="/connexion" className="underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
