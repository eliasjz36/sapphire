import ProductItemCard from './ProductCard'

import { ProductItemContainerProps } from '../../ts/interfaces/product.interfaces'

const ProductItemContainer = ({
  products,
  className,
}: ProductItemContainerProps) => {
  return (
    <div
      className={`grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ${className}`}
    >
      {products?.map((product) => (
        <ProductItemCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductItemContainer
