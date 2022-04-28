import { Product } from './product.interfaces'

export interface StateProducts {
  products: Product[]
  error: string
  loading: boolean
}

export interface StateProduct {
  product: Product
  error: string
  loading: boolean
}

export interface StateCategories {
  categories?: []
  products?: []
  error?: string
  loading?: boolean
}
