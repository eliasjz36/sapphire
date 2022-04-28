import { useCallback, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import jsCookie from 'js-cookie'

import { Store } from '../context/Store'

import { getError } from '../utils/error'

import { RegistrationFormData } from '../ts/interfaces/auth.interfaces'
import { CartActionKind } from '../ts/enums/cart.enums'

const useRegistrationForm = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape(
        {
          name: yup.string().max(40, 'Name is too long'),
          email: yup.string().email('Email is not valid'),
          password: yup
            .string()
            .nullable()
            .notRequired()
            .when('password', {
              is: (value: any) => value?.length,
              then: (rule) =>
                rule.matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  'Password is not valid'
                ),
            }),
          passwordConfirmation: yup.string().test({
            name: 'password-confirmation',
            message: "Those passwords didn't match. Try again.",
            test: function () {
              const { password, passwordConfirmation } = this.parent
              if (password && passwordConfirmation !== password) {
                return false
              }
              return true
            },
          }),
        },
        [['password', 'password']]
      ),
    []
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(validationSchema),
  })

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    } else {
      setValue('name', userInfo.name)
      setValue('email', userInfo.email)
    }
  }, [router, setValue, userInfo])

  const onSubmit = useCallback(
    async ({ name, email, password }: RegistrationFormData) => {
      try {
        const { data } = await axios.put(
          '/api/users/profile',
          {
            name,
            email,
            password,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        )

        dispatch({ type: CartActionKind.USER_LOGIN, payload: data })

        jsCookie.set('userInfo', JSON.stringify(data))

        toast.success('Profile updated successfully')
      } catch (error) {
        toast.error(getError(error as Error))
      }
    },
    []
  )

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    redirect,
  }
}

export default useRegistrationForm
