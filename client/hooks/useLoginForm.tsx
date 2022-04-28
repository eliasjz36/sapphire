import { useCallback, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { toast } from 'react-toastify'

import { Store } from '../context/Store'

import { getError } from '../utils/error'

import { LoginFormData } from '../ts/interfaces/auth.interfaces'
import { User } from '../ts/interfaces/user.interfaces'
import { CartActionKind } from '../ts/enums/cart.enums'

const useLoginForm = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email('Email is not valid')
          .required('Email is required'),
        password: yup
          .string()
          .required('Password is requred')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password is not valid'
          ),
      }),
    []
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  })

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (userInfo) {
      router.push((redirect as string) || '/')
    }
  }, [router, userInfo, redirect])

  const onSubmit = useCallback(async ({ email, password }: LoginFormData) => {
    try {
      const { data }: { data: User } = await axios.post('/api/users/login', {
        email,
        password,
      })

      dispatch({ type: CartActionKind.USER_LOGIN, payload: data })

      jsCookie.set('userInfo', JSON.stringify(data))

      toast.success('Login successful')

      router.push((redirect as string) || '/')
    } catch (error) {
      toast.error(getError(error as Error))
    }
  }, [])

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    redirect,
  }
}

export default useLoginForm
