import { SectionHeading } from '@/components/SectionHeading'

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <SectionHeading
        title="Une boutique pensée pour l'automatisation"
        subtitle="Atelier Novaa est une marque temporaire destinée à démontrer une architecture e-commerce premium et scalable."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-xl">Vision produit</h3>
          <p className="mt-3 text-sm text-ink-600">
            Chaque coque est référencée avec un modèle de données réaliste, prêt à être synchronisé
            avec un backend PostgreSQL et des workflows n8n.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-xl">Déploiement prêt</h3>
          <p className="mt-3 text-sm text-ink-600">
            Frontend statique compatible Nginx/Traefik, build Vite standard, sans serveur Node.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-xl">Automatisation</h3>
          <p className="mt-3 text-sm text-ink-600">
            Catalogues, commandes, livraisons et retours pourront être orchestrés via n8n.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-xl">Paiements</h3>
          <p className="mt-3 text-sm text-ink-600">
            Intégration prévue pour Stripe et PayPal, avec UI déjà en place.
          </p>
        </div>
      </div>
    </div>
  )
}
