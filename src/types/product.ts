export type Product = {
  wc_id?: number | null
  product_id: number
  sku?: string | null
  ean?: string | null
  reference: string
  name: string
  model?: string | null
  marque?: string | null
  type?: string | null
  color?: string | null
  category?: string | null
  sub_category?: string | null
  supplier?: string | null
  purchase_price?: number | null
  purchase_qty?: number | null
  prix_normal: number
  prix_solde?: number | null
  margin?: number | null
  visibilite_catalogue?: 'visible' | 'hidden'
  gerer_le_stock?: boolean | null
  etat_du_stock?: 'instock' | 'outofstock' | 'onbackorder' | null
  quantite_en_stock?: number | null
  date_debut_promo?: string | null
  date_fin_promo?: string | null
  note_d_achat?: string | null
  longueur?: number | null
  largeur?: number | null
  hauteur?: number | null
  poids?: number | null
  produit_mis_en_avant?: boolean | null
  avis_autorises?: boolean | null
  classe_de_livraison?: string | null
  ventes_croisees_ids?: number[] | null
  img_url?: string | null
  images?: string[] | null
  description_courte?: string | null
  description?: string | null
  createdAt?: string | null
}

export type ProductSearchParams = {
  query?: string
  marque?: string
  model?: string
  category?: string
  color?: string
  priceMin?: number
  priceMax?: number
  withImage?: boolean
  sort?: 'price-asc' | 'price-desc' | 'featured' | 'newest'
  includeHidden?: boolean
}
