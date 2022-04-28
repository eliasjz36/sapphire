import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { FilterSolid } from '@graywolfai/react-heroicons'

import ProductItemContainer from '../../product/ProductListContainer'
import MobileFilter from './MobileFilter'
import Loading from '../../ui/Loading'
import Filter from './Filter'
import Sorter from './Sorter'
import Error from '../../ui/Error'

import { fetchCategories } from '../../../services/fetchCategories'
import { fetchProductsFiltered } from '../../../services/fetchProductsFiltered'
import { StateCategories } from '../../../ts/interfaces/state.interfaces'

interface FilterSearch {
  category?: string
  sort?: string
  min?: string
  max?: string
  searchQuery?: string
  price?: string
  query?: string
  rating?: string
}

const FilterContainer = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const router = useRouter()
  const {
    category = 'all',
    query = 'all',
    price = 'all',
    rating = 'all',
    sort = 'default',
  }: FilterSearch = router.query
  const [state, setState] = useState<StateCategories>({
    categories: [],
    products: [],
    error: '',
    loading: true,
  })
  const { loading, products, error } = state
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories(setCategories)

    fetchProductsFiltered(category, query, price, rating, sort, setState)
  }, [category, price, query, rating, sort])

  const filterSearch = ({
    category,
    sort,
    searchQuery,
    price,
    rating,
  }: FilterSearch) => {
    const path = router.pathname
    const { query } = router

    if (searchQuery) query.searcQuery = searchQuery
    if (category) query.category = category
    if (sort) query.sort = sort
    if (price) query.price = price
    if (rating) query.rating = rating

    router.push({
      pathname: path,
      query: query,
    })
  }

  const filterHandler = (value: string, filter: string) => {
    filterSearch({ [filter]: value })
  }

  return (
    <div>
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filterHandler={filterHandler}
        data={{ category, price, rating, categories }}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col items-center justify-between  border-b border-gray-200 pb-6 md:flex-row md:items-baseline">
          <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            New Arrivals
          </h1>

          <div className="flex items-center">
            <Sorter filterHandler={filterHandler} />

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterSolid className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            <Filter
              filterHandler={filterHandler}
              data={{ category, price, rating, categories }}
              screen="desktop"
            />

            {/* Product grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <Loading />
              ) : error ? (
                <Error error={error} />
              ) : (
                <ProductItemContainer
                  products={products}
                  className="lg:grid-cols-2 xl:grid-cols-3"
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FilterContainer
