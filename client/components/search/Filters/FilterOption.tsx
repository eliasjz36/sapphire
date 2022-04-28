import { Listbox } from '@headlessui/react'

import classNames from '../../../utils/classNames'

interface FilterOptionProps {
  option: {
    id?: string
    name: string | JSX.Element
    value: string | number
  }
}

const FilterOption = ({ option }: FilterOptionProps) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames(
          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9'
        )
      }
      value={option.value}
    >
      {({ selected }) => (
        <>
          <div className="flex items-center">
            <span
              className={classNames(
                selected ? 'font-semibold' : 'font-normal',
                'ml-3 block truncate'
              )}
            >
              {option.name}
            </span>
          </div>
        </>
      )}
    </Listbox.Option>
  )
}

export default FilterOption
