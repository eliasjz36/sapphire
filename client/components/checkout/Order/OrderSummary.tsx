import { ReactNode } from 'react'

interface OrderSummaryProps {
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  children: ReactNode
}

const OrderSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  children,
}: OrderSummaryProps) => {
  return (
    <div className="max-w col-span-1 row-span-1 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="text-heading flex w-full items-center justify-between border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base dark:border-gray-700 md:grid-cols-2 lg:py-5 lg:px-3">
        Subtotal:
        <span className="ml-2">${itemsPrice}</span>
      </div>
      <div className="text-heading flex w-full items-center justify-between border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base dark:border-gray-700 lg:py-5 lg:px-3">
        Shipping:<span className="ml-2">${shippingPrice}</span>
      </div>
      <div className="text-heading flex w-full items-center justify-between border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base dark:border-gray-700 lg:py-5 lg:px-3">
        Tax:<span className="ml-2">${taxPrice}</span>
      </div>
      <div className="text-heading flex w-full items-center justify-between border-b border-gray-300 py-4 text-sm font-bold last:border-b-0 last:pb-0 last:text-base dark:border-gray-700 lg:py-5 lg:px-3">
        Total:<span className="ml-2">${totalPrice}</span>
      </div>
      <div className="text-heading flex w-full items-center justify-between border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base dark:border-gray-700 lg:py-5 lg:px-3">
        {children}
      </div>
    </div>
  )
}

export default OrderSummary
