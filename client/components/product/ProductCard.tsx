import Link from 'next/link'
import Image from 'next/image'

import Button from '../ui/Button'
import Rating from '../ui/Rating'

import useAddToCart from '../../hooks/useAddToCart'

import { urlForThumbnail } from '../../utils/image'

import { ProductItemProps } from '../../ts/interfaces/product.interfaces'

const ProductItemCard = ({ product }: ProductItemProps) => {
  const addToCartHandler = useAddToCart(product)

  return (
    <Link href={`/product/${product.slug.current}`} passHref>
      <a>
        <div className="mx-auto max-w-xs rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-[.98] dark:border-gray-700 dark:bg-gray-800">
          <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none relative mb-5 h-80 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75">
            <Image
              src={urlForThumbnail(product.image)}
              alt={product.description}
              layout="fill"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>

            <div className="mt-2.5 mb-5 flex items-center">
              <Rating rating={product.rating} />

              <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                {product.rating}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>

              <Button
                onClickHandler={addToCartHandler}
                content="Add to cart"
                className="w-28"
              />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductItemCard
