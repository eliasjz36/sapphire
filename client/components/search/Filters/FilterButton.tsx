import { SelectorSolid } from '@graywolfai/react-heroicons'
import { Listbox } from '@headlessui/react'

interface FilterButtonProps {
  content: string | JSX.Element
}

const FilterButton = ({ content }: FilterButtonProps) => {
  return (
    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
      <span className="flex items-center">
        <span className="ml-3 block truncate text-gray-800">
          <div className="flex">{content}</div>
        </span>
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <SelectorSolid className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  )
}

export default FilterButton
