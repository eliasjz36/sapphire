import { useContext, useEffect, useReducer } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next/types'
import { useRouter } from 'next/router'

import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js'

import { Layout } from '../../components'
import { Loading } from '../../components/ui'
import OrderSummary from '../../components/checkout/Order/OrderSummary'
import OrderItems from '../../components/checkout/Order/OrderItems'

import { Store } from '../../context/Store'

import { getError } from '../../utils/error'

import {
  OrderAction,
  OrderScreenProps,
  OrderState,
} from '../../ts/interfaces/order.interfaces'
import { FetchActionKind } from '../../ts/enums/order.enums'

const reducer = (state: OrderState, action: OrderAction) => {
  switch (action.type) {
    case FetchActionKind.FETCH_REQUEST:
      return { ...state, loading: true, error: '' }
    case FetchActionKind.FETCH_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: '' }
    case FetchActionKind.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }
    case FetchActionKind.PAY_REQUEST:
      return { ...state, loadingPay: true }
    case FetchActionKind.PAY_SUCCESS:
      return { ...state, loadingPay: false, successPay: true }
    case FetchActionKind.PAY_FAIL:
      return { ...state, loadingPay: false, errorPay: action.payload }
    case FetchActionKind.PAY_RESET:
      return { ...state, loadingPay: false, successPay: false, errorPay: '' }
    default:
      return state
  }
}

const OrderScreen = ({ params }: OrderScreenProps) => {
  const { id: orderId } = params
  const [{ loading, order, successPay }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
  })
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order

  const router = useRouter()
  const { state } = useContext(Store)
  const { userInfo } = state
  const orderInfo = [
    {
      title: 'Shipping Address',
      route: '/shipping',
      content: shippingAddress
        ? `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`
        : '',
      status: `Status: ${
        isDelivered ? `delivered at ${deliveredAt}` : 'not delivered'
      }`,
    },
    {
      title: 'Payment Method',
      route: '/payment',
      content: paymentMethod,
      status: `Status: ${isPaid ? `paid at ${paidAt}` : 'not paid'}`,
    },
  ]
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }

    if (successPay) {
      router.push('/order-history')
    }

    const fetchOrder = async () => {
      try {
        dispatch({ type: FetchActionKind.FETCH_REQUEST })

        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        console.log(data)

        dispatch({ type: FetchActionKind.FETCH_SUCCESS, payload: data })
      } catch (error) {
        dispatch({
          type: FetchActionKind.FETCH_FAIL,
          payload: toast.error(getError(error as Error)),
        })
      }
    }

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder()

      if (successPay) {
        dispatch({ type: FetchActionKind.PAY_RESET })
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })

        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        })

        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        })
      }

      loadPaypalScript()
    }
  }, [order, orderId, successPay, paypalDispatch, router, userInfo])

  const createOrder = (
    data: Record<string, unknown>,
    actions: CreateOrderActions
  ) =>
    actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID: string) => {
        return orderID
      })

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    actions.order?.capture().then(async (details) => {
      try {
        dispatch({ type: FetchActionKind.PAY_REQUEST })

        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        )

        dispatch({ type: FetchActionKind.PAY_SUCCESS, payload: data })

        toast.info(
          'We are proccessing your order, wait a moment and refresh the page.',
          { autoClose: 4000 }
        )
      } catch (error) {
        dispatch({
          type: FetchActionKind.PAY_FAIL,
          payload: getError(error as Error),
        })

        toast.error(getError(error as Error))
      }
    })
  }

  const onError = (error: any) => {
    toast.error(getError(error))
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-8 text-center text-xl font-extrabold tracking-wide text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
        Order {orderId}
      </h1>
      {loading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
          <div className="col-span-2 row-span-2 flex flex-col">
            {orderInfo.map((item, index) => (
              <div
                key={item.title + index}
                className="max-w mb-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.content}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.status}
                </p>
              </div>
            ))}

            <OrderItems cartItems={orderItems} />
          </div>

          <OrderSummary
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
            taxPrice={taxPrice}
            totalPrice={totalPrice}
          >
            {!isPaid && (
              <div className="w-full rounded-xl border-b border-gray-300 bg-white py-4 px-3 text-center last:border-b-0 last:pb-0 dark:bg-white lg:py-5">
                {isPending ? (
                  <Loading />
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    style={{ color: 'blue', shape: 'pill' }}
                  />
                )}
              </div>
            )}
          </OrderSummary>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderScreen) as any, {
  ssr: false,
})

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.params) {
    return {
      props: { params: ctx.params },
    }
  }
  return {
    props: {},
  }
}
