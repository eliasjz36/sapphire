import { useContext } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { ArrowLeftSolid, XSolid } from '@graywolfai/react-heroicons'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Layout } from '../components'
import OrderSummary from '../components/checkout/Order/OrderSummary'

import { Store } from '../context/Store'

import { CartActionKind } from '../ts/enums/cart.enums'
import { CartItem } from '../ts/interfaces/cart.interface'

const CartScreen = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)
  const updateCartHandler = async (item: CartItem, quantity: number) => {
    const { data } = await axios.get(`/api/products/${item._key}`)

    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock')

      return
    }

    dispatch({
      type: CartActionKind.CART_ADD_ITEM,
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    })

    toast.success(`${item.name} updated in the cart`)
  }
  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: CartActionKind.CART_REMOVE_ITEM, payload: item })
  }

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  )
  const shippingPrice = round2(itemsPrice > 200 ? 0 : 15)
  const taxPrice = round2(itemsPrice * 0.15)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  return (
    <Layout title="Shopping Cart">
      {cartItems.length === 0 ? (
        <div className="mx-auto w-9/12 max-w-7xl">
          <h3>Cart is empty</h3>
          <Link href="/" passHref>
            <a className="text-indigo-800 dark:text-indigo-400">
              Go to shopping
            </a>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto rounded bg-white p-10 dark:bg-gray-900">
          <div className="mt-6 pb-8">
            <Link href="/" passHref>
              <a
                aria-current="page"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <ArrowLeftSolid className="mr-2 h-4 w-4" />
                Continue shopping
              </a>
            </Link>
            <h1 className="my-8 text-center text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Shopping Cart
            </h1>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
            <div className="col-span-2 row-span-2 mb-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="relative overflow-x-auto overflow-y-hidden rounded-lg">
                <table className="min-h-full w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                    <tr>
                      {['Product', 'Quantity', 'Price'].map((col, index) => (
                        <th key={col + index} scope="col" className="px-2 py-3">
                          {col}
                        </th>
                      ))}
                      <th scope="col" className="">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: CartItem) => (
                      <tr
                        key={item._key + item.name}
                        className="border-b bg-white dark:border-gray-300 dark:bg-gray-100"
                      >
                        <td
                          scope="row"
                          className="flex items-start whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-gray-800"
                        >
                          <div className="w-36 rounded-lg">
                            <Link href={`/product/${item.slug}`} passHref>
                              <a>
                                <Image
                                  src={item.image}
                                  width="100"
                                  height="100"
                                  alt={item.image}
                                  className="rounded-lg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="flex flex-col">
                            <Link href={`/product/${item.slug}`} passHref>
                              <a className="text-base">{item.name}</a>
                            </Link>
                            <span className="text-gray-500">
                              Size: XL, Color: blue
                            </span>
                            <span className="text-gray-500">Brand: Gucci</span>
                          </div>
                        </td>
                        <td>
                          <select
                            id="countries"
                            onChange={(e) =>
                              updateCartHandler(item, Number(e.target.value))
                            }
                            className="block w-fit rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          >
                            {Array.from(Array(10), (e, i) => i + 1).map(
                              (num) => (
                                <option value={num} key={num}>
                                  {num}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="px-6 py-4 font-bold text-black dark:text-gray-800">
                          ${item.price}
                        </td>
                        <td>
                          <XSolid
                            className="h-5 w-5 cursor-pointer text-gray-400 hover:text-black"
                            onClick={() => removeItemHandler(item)}
                          />
                        </td>
                      </tr>
                    ))}
                    <div></div>
                  </tbody>
                </table>
              </div>
            </div>

            <OrderSummary
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
              taxPrice={taxPrice}
              totalPrice={totalPrice}
            >
              <Link href="/shipping" passHref>
                <a className="col-span-12 w-full rounded-lg bg-indigo-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                  Checkout
                </a>
              </Link>
            </OrderSummary>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen) as any, { ssr: false })
