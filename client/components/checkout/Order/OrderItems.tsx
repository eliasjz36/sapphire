import OrderItemsTable from './OrderItemsTable'

import { CartItem } from '../../../ts/interfaces/cart.interface'

interface OrderItemsProps {
  cartItems: CartItem[]
}

const OrderItems = ({ cartItems }: OrderItemsProps) => {
  return (
    <div className="max-w mb-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Order Items
      </h5>
      <div className="relative overflow-x-auto rounded-lg">
        <OrderItemsTable cartItems={cartItems} />
      </div>
    </div>
  )
}

export default OrderItems
