import { Fragment } from 'react'
import Link from 'next/link'

import { ChevronDownSolid } from '@graywolfai/react-heroicons'
import { Menu, Transition } from '@headlessui/react'

import classNames from '../../../utils/classNames'

import { User } from '../../../ts/interfaces/user.interfaces'

interface UserMenuProps {
  logoutClickHandler(): void
  className?: string
  userInfo: User | null
}

const UserMenu = ({
  logoutClickHandler,
  className,
  userInfo,
}: UserMenuProps) => {
  return (
    <div
      className={`${className} lg:flex-1 lg:items-center lg:justify-end lg:space-x-6`}
    >
      {userInfo ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              {userInfo.name}
              <ChevronDownSolid
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-50 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/profile" passHref>
                      <a
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block w-full px-4 py-2 text-center text-sm hover:bg-gray-100'
                        )}
                      >
                        Profile
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link href="/order-history" passHref>
                      <a
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block w-full px-4 py-2 text-center text-sm hover:bg-gray-100'
                        )}
                      >
                        Order History
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={logoutClickHandler}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-center text-sm'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <>
          <Link href="/login" passHref>
            <a className="-m-2 block p-2 font-medium text-gray-900 dark:text-white">
              Sign in
            </a>
          </Link>

          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <Link href="/register" passHref>
            <a className="-m-2 block p-2 font-medium text-gray-900 dark:text-white">
              Sign up
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

export default UserMenu
