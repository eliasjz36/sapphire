import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
  SearchSolid,
  MenuSolid,
  ShoppingBagSolid,
} from '@graywolfai/react-heroicons'
import jsCookie from 'js-cookie'
import { toast } from 'react-toastify'

import MobileNav from './MobileNav'
import FlyoutMenus from './FlyoutMenus'
import UserMenu from './UserMenu'
import ThemeToggler from './ThemeToggler'

import MoonIcon from '../../icons/MoonIcon'
import SunIcon from '../../icons/SunIcon'

import { Store } from '../../../context/Store'

import { CartActionKind } from '../../../ts/enums/cart.enums'
import { User } from '../../../ts/interfaces/user.interfaces'

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const cartItemsQuantity = cart.cartItems.reduce(
    (itemsQuantity, item) => itemsQuantity + item.quantity,
    0
  )
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    setUserInfo(state.userInfo)

    return () => {
      setUserInfo(null)
    }
  }, [state.userInfo])

  const renderThemeHandler = () => {
    if (!isMounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className="text-yellow-300 hover:text-yellow-400"
          onClick={() => setTheme('light')}
        />
      )
    } else {
      return (
        <MoonIcon
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setTheme('dark')}
        />
      )
    }
  }

  const logoutClickHandler = () => {
    dispatch({ type: CartActionKind.USER_LOGOUT })

    jsCookie.remove('userInfo')
    jsCookie.remove('cartItems')
    jsCookie.remove('shippingAddress')
    jsCookie.remove('paymentMethod')

    toast.success('Logout successful')

    router.push('/')
  }

  const [query, setQuery] = useState('')
  const queryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.push(`/search?query=${query}`)
  }

  return (
    <div className="mb-20 bg-white">
      <header className="relative bg-white transition-all duration-300 dark:bg-gray-800">
        <div className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          <Image
            src="/images/popper.svg"
            alt="party popper"
            width={24}
            height={24}
          />
          <p className="mx-2">Welcome to my new store!</p>
          <Image
            src="/images/popper.svg"
            alt="party popper"
            width={24}
            height={24}
          />
        </div>

        {/* mobile menu */}
        <MobileNav
          open={open}
          setOpen={setOpen}
          renderThemeHandler={renderThemeHandler}
          logoutClickHandler={logoutClickHandler}
          userInfo={userInfo || null}
        />

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-transparent p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuSolid className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/" passHref>
                  <a className="flex justify-center">
                    <span className="sr-only">Saphire</span>
                    <Image
                      src="/favicon.svg"
                      alt="sapphire logo"
                      width={40}
                      height={40}
                    />
                  </a>
                </Link>
              </div>

              {/* Flyout menus */}
              <FlyoutMenus />

              <div className="it ems-center ml-auto flex">
                {/* User menu */}
                <UserMenu
                  logoutClickHandler={logoutClickHandler}
                  userInfo={userInfo}
                  className="hidden lg:flex"
                />

                {/* Search */}
                <div className="flex items-center lg:ml-6">
                  <div className="relative pl-2 text-gray-400 focus-within:text-gray-600">
                    <span className="sr-only">Search</span>
                    <form onSubmit={submitHandler}>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <button
                          type="submit"
                          className="focus:shadow-outline p-1 focus:outline-none"
                        >
                          <SearchSolid className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </span>
                      <input
                        type="search"
                        name="query"
                        className="w-full rounded-md py-2 pl-10 text-sm text-gray-900 shadow-lg focus:text-gray-900 focus:outline-none dark:bg-gray-900 dark:text-white dark:focus:bg-white dark:focus:text-gray-900"
                        placeholder="Search..."
                        autoComplete="on"
                        onChange={queryChangeHandler}
                      />
                    </form>
                  </div>
                </div>

                {/* Cart */}
                <div className="ml-4 flex lg:ml-6">
                  <Link href="/cart" passHref>
                    <a className="group -m-2 flex items-center p-2">
                      <ShoppingBagSolid
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {cart.cartItems.length ? (
                        <span className="mr-2 inline-flex items-center justify-center rounded-full bg-indigo-600 px-2 py-1 text-xs font-bold leading-none text-white">
                          {cartItemsQuantity <= 99 ? cartItemsQuantity : '99+'}
                        </span>
                      ) : (
                        ''
                      )}
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </Link>
                </div>

                {/* Theme toggler */}
                <ThemeToggler
                  renderThemeHandler={renderThemeHandler}
                  className="ml-4 hidden md:flex"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
