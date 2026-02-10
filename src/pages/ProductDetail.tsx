import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { ProductService } from '@/services/ProductService'
import { Product } from '@/types/product'
import { ProductImage } from '@/components/ProductImage'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'

const formatPrice = (value: number) => value.toFixed(2).replace('.', ',')

const StockBadge = ({ product }: { product: Product }) => {
  if (!product.etat_du_stock) return null
  const label =
    product.etat_du_stock === 'instock'
      ? 'En stock'
      : product.etat_du_stock === 'onbackorder'
        ? 'Sur commande'
        : 'Rupture'
  const tone =
    product.etat_du_stock === 'instock'
      ? 'bg-neon-500/15 text-neon-500'
    : product.etat_du_stock === 'onbackorder'
        ? 'bg-ember-500/15 text-ember-500'
        : 'bg-white/70 text-ink-600'
  return <span className={`badge ${tone}`}>{label}</span>
}

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | undefined>()
  const addItem = useCartStore((state) => state.addItem)
  const wishlist = useWishlistStore()

  useEffect(() => {
    if (!slug) return
    ProductService.getProductBySlug(slug).then(setProduct)
  }, [slug])

  const images = useMemo(() => {
    if (!product) return []
    const list = [product.img_url, ...(product.images ?? [])].filter(Boolean) as string[]
    return Array.from(new Set(list))
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="font-display text-2xl">Produit introuvable</p>
        <p className="mt-2 text-sm text-ink-600">
          Ce produit n&#39;est plus visible ou l&#39;URL est incorrecte.
        </p>
        <Link to="/catalogue" className="btn-primary mt-6">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-500">Fiche produit</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm text-ink-600">Réf: {product.reference}</p>
        </div>
        <StockBadge product={product} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="glass-card rounded-[32px] p-4 shadow-float">
            <div className="aspect-[4/5] w-full">
              <ProductImage src={images[0]} alt={product.name} />
            </div>
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {images.slice(1, 4).map((image) => (
                <div key={image} className="glass-card rounded-2xl p-2">
                  <div className="aspect-square w-full">
                    <ProductImage src={image} alt={product.name} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <p className="text-3xl font-semibold">
                {formatPrice(product.prix_solde ?? product.prix_normal)} €
              </p>
              {product.prix_solde && (
                <p className="text-sm text-ink-500 line-through">
                  {formatPrice(product.prix_normal)} €
                </p>
              )}
            </div>
            {product.description_courte && (
              <p className="mt-4 text-sm text-ink-600">{product.description_courte}</p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="btn-primary" onClick={() => addItem(product, 1)}>
                <ShoppingBag className="h-4 w-4" />
                Ajouter au panier
              </button>
              <button
                className="btn-ghost"
                onClick={() => wishlist.toggle(product.reference)}
              >
                <Heart className="h-4 w-4" />
                {wishlist.has(product.reference) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>
            </div>
          </div>

          {(product.marque || product.model || product.type || product.color) && (
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-display text-xl">Caractéristiques</h3>
              <div className="mt-4 grid gap-3 text-sm text-ink-600">
                {product.marque && (
                  <p>
                    <span className="text-ink-500">Marque:</span> {product.marque}
                  </p>
                )}
                {product.model && (
                  <p>
                    <span className="text-ink-500">Modèle:</span> {product.model}
                  </p>
                )}
                {product.type && (
                  <p>
                    <span className="text-ink-500">Type:</span> {product.type}
                  </p>
                )}
                {product.color && (
                  <p>
                    <span className="text-ink-500">Couleur:</span> {product.color}
                  </p>
                )}
              </div>
            </div>
          )}

          {(product.category || product.sub_category) && (
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-display text-xl">Catégories</h3>
              <p className="mt-3 text-sm text-ink-600">
                {[product.category, product.sub_category].filter(Boolean).join(' · ')}
              </p>
            </div>
          )}

          {(product.gerer_le_stock || product.quantite_en_stock != null) && (
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-display text-xl">Stock</h3>
              <p className="mt-3 text-sm text-ink-600">
                {product.quantite_en_stock != null
                  ? `${product.quantite_en_stock} unités disponibles`
                  : 'Gestion de stock active'}
              </p>
            </div>
          )}
        </div>
      </div>

      {product.description && (
        <div className="mt-12 glass-panel rounded-3xl p-8">
          <h3 className="font-display text-2xl">Description complète</h3>
          <p className="mt-4 text-sm text-ink-600">{product.description}</p>
        </div>
      )}

      {product.avis_autorises && (
        <div className="mt-12">
          <h3 className="font-display text-2xl">Avis clients</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Yanis',
                note: 'Design premium, finitions impeccables.',
              },
              {
                name: 'Jade',
                note: 'La coque est légère et tient très bien en main.',
              },
              {
                name: 'Armand',
                note: 'Livraison rapide, packaging soigné.',
              },
            ].map((review) => (
              <div key={review.name} className="glass-card rounded-3xl p-6">
                <p className="text-sm text-ink-600">{review.note}</p>
                <p className="mt-4 text-sm font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
