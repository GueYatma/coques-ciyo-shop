import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Contact</p>
          <h1 className="mt-2 font-display text-3xl">Parlons de votre boutique</h1>
          <p className="mt-4 text-sm text-ink-600">
            Cette V1 est prête à être connectée à n8n, PostgreSQL et des paiements. Contactez-nous
            pour définir le branding final.
          </p>
          <div className="mt-6 space-y-3 text-sm text-ink-600">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-neon-500" />
              support@ciyo.shop
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-neon-500" />
              +33 1 80 88 99 00
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-neon-500" />
              Paris, France
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h2 className="font-display text-xl">Demande de démo</h2>
          <div className="mt-4 grid gap-4">
            <input className="input" placeholder="Nom complet" />
            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Entreprise" />
            <textarea className="input min-h-[140px]" placeholder="Votre message" />
            <button className="btn-primary">Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  )
}
