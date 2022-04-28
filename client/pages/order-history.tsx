import { useContext, useEffect, useReducer } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import axios from 'axios'
import { InformationCircleSolid } from '@graywolfai/react-heroicons'

import { Layout } from '../components'
import Loading from '../components/ui/Loading'

import { Store } from '../context/Store'

import { getError } from '../utils/error'

import { OrderHistoryState } from '../ts/interfaces/order.interfaces'
import { OrderAction } from '../ts/interfaces/order.interfaces'
import { FetchActionKind } from '../ts/enums/order.enums'

const reducer = (state: OrderHistoryState, action: OrderAction) => {
  switch (action.type) {
    case FetchActionKind.FETCH_REQUEST:
      return { ...state, loading: true, error: '' }
    case FetchActionKind.FETCH_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: '' }
    case FetchActionKind.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const OrderHistoryScreen = () => {
  const router = useRouter()
  const { state } = useContext(Store)
  const { userInfo } = state
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  })

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }

    const fetchOrders = async () => {
      try {
        dispatch({ type: FetchActionKind.FETCH_REQUEST })

        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })

        dispatch({ type: FetchActionKind.FETCH_SUCCESS, payload: data })
      } catch (error) {
        dispatch({
          type: FetchActionKind.FETCH_FAIL,
          payload: getError(error as Error),
        })
      }
    }

    fetchOrders()
  }, [router, userInfo])

  return (
    <Layout title="Order History">
      <h1 className="mb-8 text-center text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white sm:text-3xl">
        Order History
      </h1>

      {loading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : error ? (
        <div
          className="mb-4 flex rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <InformationCircleSolid className="mr-3 inline h-5 w-5 flex-shrink-0 text-red-700" />
          <div>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      ) : (
        <div className="relative mx-auto max-w-7xl overflow-x-auto rounded-lg shadow-md">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {['ID', 'DATE', 'TOTAL', 'PAID'].map((header, index) => (
                  <th key={header + index} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr
                  key={order._id}
                  className="odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {order._id}
                  </th>
                  <td className="px-6 py-4">{order.createdAt}</td>
                  <td className="px-6 py-4">${order.totalPrice}</td>
                  <td className="px-6 py-4">
                    {order.isPaid ? `paid at ${order.paidAt}` : `not paid`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/order/${order._id}`} passHref>
                      <a className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
                        Details
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderHistoryScreen) as any, {
  ssr: false,
})
