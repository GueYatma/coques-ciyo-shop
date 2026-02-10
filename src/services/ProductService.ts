import { products } from '@/data/products'
import { Product, ProductSearchParams } from '@/types/product'
import { slugify } from '@/utils/slugify'

const normalizeVisibility = (product: Product): Product => ({
  ...product,
  visibilite_catalogue: product.visibilite_catalogue ?? 'visible',
})

const getPrimaryImage = (product: Product): string | null => {
  if (product.img_url) return product.img_url
  if (product.images && product.images.length > 0) return product.images[0]
  return null
}

const getSlug = (product: Product): string => {
  const base = `${product.name}-${product.reference}`
  return slugify(base)
}

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    // Future: replace with fetch('/api/n8n/products') or similar.
    return products.map(normalizeVisibility)
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    // Future: replace with fetch(`/api/n8n/products/${slug}`)
    const normalized = products.map(normalizeVisibility)
    return normalized.find((product) => getSlug(product) === slug)
  },

  async searchProducts(params: ProductSearchParams): Promise<Product[]> {
    const normalized = products.map(normalizeVisibility)

    let filtered = normalized.filter((product) =>
      params.includeHidden ? true : product.visibilite_catalogue !== 'hidden'
    )

    if (params.query) {
      const query = params.query.toLowerCase()
      filtered = filtered.filter((product) =>
        [product.name, product.reference, product.marque, product.model]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query)
      )
    }

    if (params.marque) {
      filtered = filtered.filter((product) => product.marque === params.marque)
    }

    if (params.model) {
      filtered = filtered.filter((product) => product.model === params.model)
    }

    if (params.category) {
      filtered = filtered.filter((product) => product.category === params.category)
    }

    if (params.color) {
      filtered = filtered.filter((product) => product.color === params.color)
    }

    if (typeof params.priceMin === 'number') {
      filtered = filtered.filter((product) => product.prix_normal >= params.priceMin!)
    }

    if (typeof params.priceMax === 'number') {
      filtered = filtered.filter((product) => product.prix_normal <= params.priceMax!)
    }

    if (params.withImage) {
      filtered = filtered.filter((product) => Boolean(getPrimaryImage(product)))
    }

    const sorter = params.sort ?? 'featured'
    const byFeatured = (a: Product, b: Product) => {
      const aFeat = a.produit_mis_en_avant ? 1 : 0
      const bFeat = b.produit_mis_en_avant ? 1 : 0
      if (aFeat !== bFeat) return bFeat - aFeat
      return b.product_id - a.product_id
    }

    const byNewest = (a: Product, b: Product) => {
      const aTime = a.createdAt ? Date.parse(a.createdAt) : a.product_id
      const bTime = b.createdAt ? Date.parse(b.createdAt) : b.product_id
      return bTime - aTime
    }

    const byPriceAsc = (a: Product, b: Product) => a.prix_normal - b.prix_normal
    const byPriceDesc = (a: Product, b: Product) => b.prix_normal - a.prix_normal

    const sorted = [...filtered]
    switch (sorter) {
      case 'price-asc':
        sorted.sort(byPriceAsc)
        break
      case 'price-desc':
        sorted.sort(byPriceDesc)
        break
      case 'newest':
        sorted.sort(byNewest)
        break
      case 'featured':
      default:
        sorted.sort(byFeatured)
        break
    }

    return sorted
  },

  getSlug,
  getPrimaryImage,
}
