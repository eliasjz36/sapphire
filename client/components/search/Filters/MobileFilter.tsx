import { Fragment } from 'react'

import { XSolid } from '@graywolfai/react-heroicons'
import { Dialog, Transition } from '@headlessui/react'

import Filter from './Filter'

interface MobileFilterProps {
  mobileFiltersOpen: boolean
  setMobileFiltersOpen(value: boolean): void // eslint-disable-line no-unused-vars
  filterHandler(value: string, filter: string): void // eslint-disable-line no-unused-vars
  data: {
    category: string
    price: string
    rating: string
    categories: string[]
  }
}

const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filterHandler,
  data,
}: MobileFilterProps) => {
  const { category, price, rating, categories } = data

  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-transparent p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XSolid className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <Filter
              filterHandler={filterHandler}
              data={{ category, price, rating, categories }}
              screen="mobile"
            />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileFilter
