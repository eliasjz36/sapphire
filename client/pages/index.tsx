import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Layout } from '../components'
import { Error } from '../components/ui'
import Loading from '../components/ui/Loading'
import ProductItemContainer from '../components/product'

import client from '../utils/client'

import { StateProducts } from '../ts/interfaces/state.interfaces'

const Home: NextPage = () => {
  const [state, setState] = useState<StateProducts>({
    products: [],
    error: '',
    loading: true,
  })
  const { products, error, loading } = state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`)

        setState({ products, loading: false, error: '' })
      } catch (error) {
        setState({
          products: [],
          loading: false,
          error: (error as Error).message,
        })
      }
    }

    fetchData()
  }, [])

  return (
    <Layout title="Sapphire">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="-mt-20">
          <div className="border-b-2 border-gray-200 bg-gray-100 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
            <div className="container mx-auto flex flex-col items-center py-12 sm:py-48">
              <div className="mb-5 w-11/12 flex-col items-center justify-center sm:mb-10 sm:w-2/3 lg:flex">
                <h1 className="text-center text-2xl font-black leading-7 text-gray-800 dark:text-white sm:text-3xl md:text-4xl md:leading-10 lg:text-5xl xl:text-6xl">
                  New{' '}
                  <span className="text-indigo-700 dark:text-indigo-500">
                    Arrivals
                  </span>{' '}
                  are here
                </h1>
                <p className="mt-5 text-center text-sm font-normal text-gray-600 dark:text-gray-200 sm:mt-10 sm:text-lg lg:w-10/12">
                  The new arrivals have, well, newly arrived. Check out the
                  latest options from our summer small-batch release while they
                  are still in stock
                </p>
              </div>

              <a
                type="button"
                href="#products"
                className="lg:text-md rounded border border-indigo-700 bg-indigo-700 px-3 py-2 text-sm text-white transition duration-150  ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 sm:px-8 sm:py-4 lg:font-bold"
              >
                Show New Arrivals
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <h1
              className="my-10 text-2xl font-extrabold tracking-wide text-gray-800 dark:text-white sm:text-3xl"
              id="products"
            >
              Trending products
            </h1>

            <ProductItemContainer products={products} />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Home
