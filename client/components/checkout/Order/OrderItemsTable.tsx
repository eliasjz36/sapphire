import Image from 'next/image'
import Link from 'next/link'

import { CartItem } from '../../../ts/interfaces/cart.interface'

interface OrderItemsTableProps {
  cartItems: CartItem[]
}

const OrderItemsTable = ({ cartItems }: OrderItemsTableProps) => {
  console.log(cartItems)
  return (
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        <tr>
          {['Product', 'Quantity', 'Price'].map((col, index) => (
            <th key={col + index} scope="col" className="px-6 py-3">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item: CartItem) => (
          <tr
            key={item._key + item.name}
            className="border-b bg-white dark:border-gray-700 dark:bg-gray-100"
          >
            <th
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
                <span className="text-gray-500">Size: XL, Color: blue</span>
                <span className="text-gray-500">Brand: Gucci</span>
              </div>
            </th>
            <td className="px-6 py-4">
              <span className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm dark:border-none dark:bg-gray-700 dark:text-white sm:text-sm">
                {item.quantity}
              </span>
            </td>
            <td className="px-6 py-4 font-bold text-black dark:text-gray-800">
              ${item.price}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrderItemsTable
