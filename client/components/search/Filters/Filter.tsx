import { Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'

import Rating from '../../ui/Rating'
import FilterButton from './FilterButton'
import FilterOption from './FilterOption'

import searchFilters from '../../../utils/searchFilters'

interface FilterProps {
  filterHandler(value: string, filter: string): void // eslint-disable-line no-unused-vars
  data: {
    category: string
    price: string
    rating: string
    categories: string[]
  }
  screen: 'mobile' | 'desktop'
}

const Filter = ({ filterHandler, data, screen }: FilterProps) => {
  const { ratings, prices } = searchFilters
  const { category, price, rating, categories } = data

  return (
    <div className={`${screen === 'desktop' && 'hidden lg:block'}`}>
      <Listbox
        value={category}
        onChange={(category) => filterHandler(category, 'category')}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-white">
              Categories
            </Listbox.Label>
            <div className="relative mt-1">
              <FilterButton content={category === 'all' ? 'All' : category} />

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <FilterOption option={{ value: 'all', name: 'All' }} />
                  {categories.map((category, index) => (
                    <FilterOption
                      option={{ value: category, name: category }}
                      key={category + index}
                    />
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <Listbox
        value={rating}
        onChange={(rating) => filterHandler(rating, 'rating')}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="mt-5 block text-sm font-medium text-gray-700 dark:text-white">
              Ratings
            </Listbox.Label>
            <div className="relative mt-1">
              <FilterButton
                content={rating !== 'all' ? <Rating rating={rating} /> : 'All'}
              />

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <FilterOption option={{ value: 'all', name: 'All' }} />

                  {ratings.map((rating, index) => (
                    <FilterOption
                      option={{
                        value: rating,
                        name: (
                          <div className="flex items-center">
                            <Rating rating={rating} />
                            <span className="ml-2">and up</span>
                          </div>
                        ),
                      }}
                      key={rating + index}
                    />
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <Listbox
        value={price}
        onChange={(price) => filterHandler(price, 'price')}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="mt-5 block text-sm font-medium text-gray-700 dark:text-white">
              Prices
            </Listbox.Label>
            <div className="relative mt-1">
              <FilterButton
                content={
                  price !== 'all'
                    ? prices.find((item) => item.id === price)!.name
                    : 'All'
                }
              />

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {prices.map((price, index) => (
                    <FilterOption option={price} key={price.id + index} />
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default Filter
