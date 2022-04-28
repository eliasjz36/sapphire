import { Listbox } from '@headlessui/react'

import classNames from '../../../utils/classNames'

interface SortOptionsProps {
  option: { title: string; name: string; current: boolean }
}

const SorterOption = ({ option }: SortOptionsProps) => {
  return (
    <Listbox.Option
      key={option.name}
      className={({ active }) =>
        classNames(
          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9'
        )
      }
      value={option.name}
    >
      {({ selected }) => (
        <>
          <div className="flex items-center justify-between">
            <span
              className={classNames(
                selected ? 'font-semibold' : 'font-normal',
                'ml-3 block truncate'
              )}
            >
              {option.title}
            </span>
          </div>
        </>
      )}
    </Listbox.Option>
  )
}

export default SorterOption
