import { useRouter } from 'next/router'

import { ArrowRightSolid } from '@graywolfai/react-heroicons'

import OrderItems from './OrderItems'

import { CartItem } from '../../../ts/interfaces/cart.interface'

interface OrderInfoProps {
  orderInfo: { title: string; content: string; route: string }[]
  cartItems: CartItem[]
}

const OrderInfo = ({ orderInfo, cartItems }: OrderInfoProps) => {
  const router = useRouter()

  return (
    <div className="col-span-2 row-span-2 flex flex-col">
      {orderInfo.map((item, index) => (
        <div
          key={item.title + index}
          className="max-w mb-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.content}
          </p>
          <button
            onClick={() => router.push(`${item.route}`)}
            className="inline-flex items-center rounded-lg bg-indigo-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Edit
            <ArrowRightSolid className="ml-2 h-4 w-4" />
          </button>
        </div>
      ))}

      <OrderItems cartItems={cartItems} />
    </div>
  )
}

export default OrderInfo
