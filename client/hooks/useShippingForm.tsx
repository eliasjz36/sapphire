import { useCallback, useContext, useEffect, useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { Store } from '../context/Store'

import { ShippingFormData } from '../ts/interfaces/shipping.interfaces'
import { CartActionKind } from '../ts/enums/cart.enums'

const useShippingForm = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        fullName: yup
          .string()
          .required('Full Name is required')
          .max(40, 'Full Name is too long'),
        address: yup
          .string()
          .required('Address is required')
          .max(40, 'Address is too long'),
        city: yup
          .string()
          .required('City is required')
          .max(40, 'City is too long'),
        postalCode: yup
          .string()
          .required('Postal Code is required')
          .max(40, 'Postal Code is too long'),
        country: yup
          .string()
          .required('Country is required')
          .max(40, 'Country is too long'),
      }),
    []
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ShippingFormData>({
    resolver: yupResolver(validationSchema),
  })

  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress },
  } = state
  const router = useRouter()

  useEffect(() => {
    if (userInfo) {
      setValue('fullName', shippingAddress.fullName)
      setValue('address', shippingAddress.address)
      setValue('city', shippingAddress.city)
      setValue('postalCode', shippingAddress.postalCode)
      setValue('country', shippingAddress.country)
    } else {
      toast.info('You need to be logged in')
      router.push('/login?redirect=/shipping')
    }
  }, [router, setValue, shippingAddress, userInfo])

  const onSubmit = useCallback(
    async ({ fullName, address, city, postalCode, country }) => {
      dispatch({
        type: CartActionKind.SAVE_SHIPPING_ADDRESS,
        payload: { fullName, address, city, postalCode, country },
      })

      jsCookie.set(
        'shippingAddress',
        JSON.stringify({
          fullName,
          address,
          city,
          postalCode,
          country,
        })
      )

      router.push('/payment')
    },
    []
  )

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
  }
}

export default useShippingForm
