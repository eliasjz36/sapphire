import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { XSolid } from '@graywolfai/react-heroicons'
import { Dialog, Tab, Transition } from '@headlessui/react'

import UserMenu from './UserMenu'
import ThemeToggler from './ThemeToggler'

import navigation from './navigation'

import classNames from '../../../utils/classNames'

import { User } from '../../../ts/interfaces/user.interfaces'
import { imageLoader } from '../../../utils/image'

interface MobileNavProps {
  open: boolean
  setOpen(value: boolean): void // eslint-disable-line no-unused-vars
  renderThemeHandler(): JSX.Element | null
  logoutClickHandler(): void
  userInfo: User | null
}

const MobileNav = ({
  open,
  setOpen,
  renderThemeHandler,
  logoutClickHandler,
  userInfo,
}: MobileNavProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
        onClose={setOpen}
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
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl transition-colors duration-300 dark:bg-gray-900">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XSolid className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-600 text-indigo-600 dark:border-indigo-600 dark:text-white'
                            : 'border-transparent text-gray-800 dark:text-white',
                          'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                        )
                      }
                    >
                      {category.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                {navigation.categories.map((category) => (
                  <Tab.Panel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
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
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900 dark:text-white"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link href={item.href} passHref>
                                <a
                                  className="-m-2 block p-2 text-gray-500 dark:text-gray-200"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.name}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="space-y-6 border-t border-gray-200 py-6 px-4 dark:border-gray-700">
              <UserMenu
                logoutClickHandler={logoutClickHandler}
                userInfo={userInfo}
              />
            </div>

            <div className="space-y-6 border-t border-gray-200 py-6 px-4 dark:border-gray-700">
              <ThemeToggler
                renderThemeHandler={renderThemeHandler}
                className="flow-root"
              />
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileNav
