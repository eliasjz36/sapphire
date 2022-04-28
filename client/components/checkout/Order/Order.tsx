import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import jsCookie from 'js-cookie'
import { toast } from 'react-toastify'

import OrderInfo from './OrderInfo'
import OrderSummary from './OrderSummary'
import Button from '../../ui/Button'

import { Store } from '../../../context/Store'

import { getError } from '../../../utils/error'

import { CartActionKind } from '../../../ts/enums/cart.enums'

const Order = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state
  const orderInfo = [
    {
      title: 'Shipping Address',
      route: '/shipping',
      content: `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`,
    },
    {
      title: 'Payment Method',
      route: '/payment',
      content: paymentMethod,
    },
  ]
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  )
  const shippingPrice = round2(itemsPrice > 200 ? 0 : 15)
  const taxPrice = round2(itemsPrice * 0.15)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')

      toast.error('You must provide a payment method')
    }

    if (cartItems.length === 0 && loading === false) {
      router.push('/cart')

      toast.error('You must have at least one product in your cart')
    }
  }, [cartItems, paymentMethod, router, loading])

  const placeOrderHandler = async () => {
    try {
      setLoading(true)

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems.map((item) => ({
            ...item,
            countInStock: null,
            slug: null,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      dispatch({ type: CartActionKind.CART_CLEAR })

      jsCookie.remove('cartItems')

      setLoading(false)

      router.push(`/order/${data}`)
    } catch (error) {
      setLoading(false)

      toast.error(getError(error as Error))
    }
  }

  return (
    <div className="mx-auto grid w-3/5 grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
      <OrderInfo orderInfo={orderInfo} cartItems={cartItems} />

      <OrderSummary
        itemsPrice={itemsPrice}
        shippingPrice={shippingPrice}
        taxPrice={taxPrice}
        totalPrice={totalPrice}
      >
        <Button
          onClickHandler={placeOrderHandler}
          disabled={loading}
          content="Place order"
        />
      </OrderSummary>
    </div>
  )
}

export default Order
