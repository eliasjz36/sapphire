import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ArrowLeftSolid } from '@graywolfai/react-heroicons'

import { Layout } from '../../components'
import { Loading, Rating } from '../../components/ui'
import { Error } from '../../components/ui'

import useAddToCart from '../../hooks/useAddToCart'

import client from '../../utils/client'
import { urlFor } from '../../utils/image'
import initialData from '../../utils/initialData'

import { StateProduct } from '../../ts/interfaces/state.interfaces'

interface ProductScreenProps {
  slug: string
}

const ProductScreen = ({ slug }: ProductScreenProps) => {
  const [state, setState] = useState<StateProduct>(initialData)
  const { product, loading, error } = state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        )

        setState({ ...state, product, loading: false })
      } catch (error) {
        setState({ ...state, error: (error as Error).message, loading: false })
      }
    }
    fetchData()
  }, [slug, state])

  const addToCartHandler = useAddToCart(product)

  return (
    <Layout title={product.name}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="rounded-lg shadow-lg dark:bg-gray-800">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li className="text-sm">
                  <Link href="/" passHref>
                    <a
                      aria-current="page"
                      className="flex items-center font-medium text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
                    >
                      <ArrowLeftSolid className="mr-2 h-4 w-4" />
                      Back to result
                    </a>
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  layout="responsive"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  {product.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900 dark:text-white">
                  ${product.price}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Rating rating={product.rating} />
                    </div>
                    <p className="sr-only">
                      {/* {product.reviews.average} out of 5 stars */}
                      {product.rating} out of 5 stars
                    </p>
                    <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"></a>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Color: White
                    </h3>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Size: XL
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={addToCartHandler}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900 dark:text-white">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ProductScreen

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.params) {
    return {
      props: { slug: ctx.params.slug },
    }
  }
  return {
    props: {},
  }
}
