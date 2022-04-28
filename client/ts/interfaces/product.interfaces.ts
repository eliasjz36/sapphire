export interface Product {
  _id: string
  name: string
  price: number
  image: string
  description: string
  slug: {
    current: string
  }
  brand: string
  category: string
  rating: number
  numReviews: number
  countInStock: number
}

export interface ProductItemContainerProps {
  products: Product[] | undefined
  className?: string
}

export interface ProductItemProps {
  product: Product
}
