import { FormEvent, useContext, useEffect, useState } from 'react'

import { RadioGroup } from '@headlessui/react'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { Layout, Stepper, PaymentMethodOption } from '../components'
import Button from '../components/ui/Button'

import { Store } from '../context/Store'

import { CartActionKind } from '../ts/enums/cart.enums'

const paymentMethods = ['PayPal', 'Debit or Credit Card']

const PaymentScreen = () => {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('')
  const { state, dispatch } = useContext(Store)
  const {
    cart: { shippingAddress },
  } = state

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!paymentMethod) {
      toast.error('You must provide a payment method')
    } else {
      dispatch({
        type: CartActionKind.SAVE_PAYMENT_METHOD,
        payload: paymentMethod,
      })

      jsCookie.set('paymentMethod', paymentMethod)

      router.push('/placeorder')
    }
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping')

      toast.error('You must provide a shipping address')
    } else {
      setPaymentMethod(jsCookie.get('paymentMethod') || '')
    }
  }, [router, shippingAddress])

  return (
    <Layout title="Payment Method">
      <Stepper activeStep={3} />

      <form onSubmit={submitHandler} className="mx-auto w-3/5">
        <h1 className="mb-8 text-center text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white sm:text-3xl">
          Payment Method
        </h1>

        <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
          <RadioGroup.Label className="sr-only">
            Payment methods
          </RadioGroup.Label>
          <div className="space-y-2">
            {paymentMethods.map((paymentMethod, index) => (
              <PaymentMethodOption
                paymentMethod={paymentMethod}
                key={paymentMethod + index}
              />
            ))}
          </div>
        </RadioGroup>

        <div className="mt-10 grid xl:grid-cols-2 xl:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <Button
              onClickHandler={() => router.push('/shipping')}
              content="Back"
            />
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <Button type="submit" content="Continue" />
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default PaymentScreen
