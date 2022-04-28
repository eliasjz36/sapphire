import { FormEvent, useContext } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { toast } from 'react-toastify'
import { Store } from '../context/Store'

import { urlForThumbnail } from '../utils/image'

import { CartActionKind } from '../ts/enums/cart.enums'
import { CartItem } from '../ts/interfaces/cart.interface'
import { Product } from '../ts/interfaces/product.interfaces'

const useAddToCart = (product: Product) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store)
  const router = useRouter()

  const addToCartHandler = async (e: FormEvent) => {
    e.preventDefault()

    const existItem = cart.cartItems.find(
      (item: CartItem) => item._key === product._id
    )
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock')

      return
    }

    dispatch({
      type: CartActionKind.CART_ADD_ITEM,
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    })

    toast.success(`${product.name} added to the cart`)

    router.push('/cart')
  }

  return addToCartHandler
}

export default useAddToCart
