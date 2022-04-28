import dynamic from 'next/dynamic'

import { Layout, Stepper, Order } from '../components'

const PlaceOrderScreen = () => {
  return (
    <Layout title="Place Order">
      <Stepper activeStep={4} />
      <h1 className="mb-8 text-center text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white sm:text-3xl">
        Place Order
      </h1>

      <Order />
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(PlaceOrderScreen) as any, {
  ssr: false,
})
