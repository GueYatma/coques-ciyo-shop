import { ReactNode } from 'react'

export const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: ReactNode }) => {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.3em] text-neon-500">CIYO LAB</p>
      <h2 className="mt-2 font-display text-3xl text-ink-900 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-ink-600">{subtitle}</p>}
    </div>
  )
}
