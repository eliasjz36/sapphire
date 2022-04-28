import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Popover, Transition } from '@headlessui/react'

import navigation from './navigation'

import classNames from '../../../utils/classNames'
import { imageLoader } from '../../../utils/image'

const FlyoutMenus = () => {
  return (
    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {navigation.categories.map((category) => (
          <Popover key={category.name} className="flex">
            {({ open }) => (
              <>
                <div className="relative flex">
                  <Popover.Button
                    className={classNames(
                      open
                        ? 'border-indigo-600 text-indigo-600 dark:text-white'
                        : 'border-transparent text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white',
                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                    )}
                  >
                    {category.name}
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute inset-x-0 top-full z-50 text-sm text-gray-500 dark:text-gray-300">
                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                    <div
                      className="absolute inset-0 top-1/2 bg-white shadow"
                      aria-hidden="true"
                    />

                    <div className="relative bg-white dark:bg-gray-800">
                      <div className="mx-auto max-w-7xl px-8">
                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                          <div className="col-start-2 grid grid-cols-2 gap-x-8">
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="group relative text-base sm:text-sm"
                              >
                                <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <Image
                                    loader={imageLoader}
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    width={280}
                                    height={280}
                                    className="object-cover object-center"
                                  />
                                </div>
                                <Link href={item.href} passHref>
                                  <a className="mt-6 block font-medium text-gray-900 dark:text-white">
                                    <span
                                      className="absolute inset-0 z-10"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                </Link>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                            {category.sections.map((section) => (
                              <div key={section.name}>
                                <p
                                  id={`${section.name}-heading`}
                                  className="font-medium text-gray-900 dark:text-white"
                                >
                                  {section.name}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${section.name}-heading`}
                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flex">
                                      <Link href={item.href} passHref>
                                        <a className="hover:text-gray-800 dark:hover:text-white">
                                          {item.name}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}
      </div>
    </Popover.Group>
  )
}

export default FlyoutMenus
