import { ImageOff } from 'lucide-react'

export const ProductImage = ({ src, alt }: { src?: string | null; alt: string }) => {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl border border-white/70 bg-white/60">
        <div className="flex flex-col items-center gap-3 text-ink-600">
          <ImageOff className="h-6 w-6" />
          <span className="text-xs">Image indisponible</span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-3xl object-cover"
      loading="lazy"
    />
  )
}
