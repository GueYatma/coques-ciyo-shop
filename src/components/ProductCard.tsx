import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Product } from '@/types/product'
import { ProductService } from '@/services/ProductService'
import { ProductImage } from '@/components/ProductImage'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'

const formatPrice = (value: number) => value.toFixed(2).replace('.', ',')

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem)
  const wishlist = useWishlistStore()
  const slug = ProductService.getSlug(product)
  const hasImage = ProductService.getPrimaryImage(product)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="glass-card card-hover rounded-3xl p-3 shadow-glass sm:p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {product.produit_mis_en_avant && (
            <span className="badge bg-neon-500/15 text-neon-500">Mis en avant</span>
          )}
          {product.prix_solde && (
            <span className="badge bg-ember-500/15 text-ember-500">Promo</span>
          )}
        </div>
        <button
          onClick={() => wishlist.toggle(product.reference)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/70"
        >
          <Heart
            className={`h-4 w-4 ${
              wishlist.has(product.reference)
                ? 'fill-ember-500 text-ember-500'
                : 'text-ink-700'
            }`}
          />
        </button>
      </div>

      <Link to={`/produit/${slug}`} className="mt-3 block sm:mt-4">
        <div className="aspect-square w-full overflow-hidden rounded-3xl sm:aspect-[4/5]">
          <ProductImage src={hasImage} alt={product.name} />
        </div>
      </Link>

      <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
        <p className="text-xs text-ink-600">Réf: {product.reference}</p>
        <Link
          to={`/produit/${slug}`}
          className="block font-display text-base leading-snug text-ink-900 sm:text-lg"
        >
          {product.name}
        </Link>
        {(product.marque || product.model) && (
          <p className="text-xs text-ink-600 sm:text-sm">
            {[product.marque, product.model].filter(Boolean).join(' · ')}
          </p>
        )}
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-ink-900 sm:text-lg">
            {formatPrice(product.prix_solde ?? product.prix_normal)} €
          </p>
          {product.prix_solde && (
            <p className="text-xs text-ink-500 line-through sm:text-sm">
              {formatPrice(product.prix_normal)} €
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between sm:mt-4">
        {product.color && (
          <span className="badge bg-white/70 text-ink-700">{product.color}</span>
        )}
        <button
          className="btn-ghost text-xs sm:text-sm"
          onClick={() => addItem(product, 1)}
          aria-label="Ajouter au panier"
        >
          <ShoppingBag className="h-4 w-4" />
          Ajouter
        </button>
      </div>
    </motion.div>
  )
}
