import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { Listbox, Transition } from '@headlessui/react'

import SorterOption from './SorterOptions'
import SorterButton from './SorterButton'

import searchFilters from '../../../utils/searchFilters'

import { FilterSearch } from '../../../ts/interfaces/search.interfaces'

interface SorterProps {
  filterHandler(value: string, filter: string): void // eslint-disable-line no-unused-vars
}

const Sorter = ({ filterHandler }: SorterProps) => {
  const { sortOptions } = searchFilters
  const router = useRouter()
  const { sort = 'default' }: FilterSearch = router.query

  return (
    <Listbox value={sort} onChange={(sort) => filterHandler(sort, 'sort')}>
      {({ open }) => (
        <>
          <Listbox.Label className="mr-5 block text-center text-sm font-medium text-gray-700 dark:text-white">
            Sort by
          </Listbox.Label>
          <div className="relative mt-1">
            <SorterButton sortOptions={sortOptions} sort={sort} />

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sortOptions.map((option) => (
                  <SorterOption option={option} key={option.name} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Sorter
