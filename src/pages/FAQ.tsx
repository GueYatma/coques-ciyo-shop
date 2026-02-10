const faqs = [
  {
    question: 'Peut-on connecter n8n plus tard ?',
    answer:
      'Oui. Les services sont déjà structurés pour être remplacés par des appels API n8n.',
  },
  {
    question: 'Le backend est-il requis pour cette V1 ?',
    answer:
      'Non. Cette V1 est frontend only avec des données mockées mais réalistes.',
  },
  {
    question: 'Le déploiement est-il prêt pour un VPS ?',
    answer:
      'Oui. Le build Vite génère un /dist statique compatible Nginx ou Traefik.',
  },
  {
    question: 'Les paiements Stripe/PayPal sont-ils actifs ?',
    answer: 'Non, les boutons sont présents mais restent en mode mock.',
  },
]

export default function FAQ() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs uppercase tracking-[0.3em] text-neon-500">FAQ</p>
      <h1 className="mt-2 font-display text-3xl">Questions fréquentes</h1>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-lg">{faq.question}</h3>
            <p className="mt-3 text-sm text-ink-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
