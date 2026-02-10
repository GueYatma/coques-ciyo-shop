import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Connexion</p>
      <h1 className="mt-2 font-display text-3xl">Se connecter</h1>
      <div className="glass-panel mt-6 rounded-3xl p-6">
        <div className="space-y-4">
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Mot de passe" type="password" />
          <button className="btn-primary w-full">Connexion (mock)</button>
          <p className="text-center text-xs text-ink-600">
            Pas encore de compte ? <Link to="/inscription" className="underline">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
