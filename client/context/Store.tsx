import { createContext, Dispatch, ReactNode, useReducer } from 'react'

import Cookies from 'js-cookie'

import { CartActionKind } from '../ts/enums/cart.enums'
import { CartState, CartAction } from '../ts/interfaces/cart.interface'

export interface StoreContext {
  state: CartState
  dispatch: Dispatch<CartAction>
}

const initialState: CartState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems')!)
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress')!)
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')!
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo')!)
    : null,
}

export const Store = createContext<StoreContext>({
  state: initialState,
  dispatch: () => null,
})

const reducer = (state: CartState, action: CartAction | any) => {
  switch (action.type) {
    case CartActionKind.CART_ADD_ITEM: {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._key === newItem._key
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._key === existItem._key ? newItem : item
          )
        : [...state.cart.cartItems, newItem]

      Cookies.set('cartItems', JSON.stringify(cartItems))

      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case CartActionKind.CART_REMOVE_ITEM:
      const cartItems = state.cart.cartItems.filter(
        (item) => item._key !== action.payload._key
      )

      Cookies.set('cartItems', JSON.stringify(cartItems))

      return { ...state, cart: { ...state.cart, cartItems } }

    case CartActionKind.CART_CLEAR:
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case CartActionKind.USER_LOGIN:
      return { ...state, userInfo: action.payload }

    case CartActionKind.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            postalCode: 0,
            country: '',
          },
          paymentMethod: '',
        },
      }

    case CartActionKind.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }

    case CartActionKind.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      }

    default:
      return state
  }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <Store.Provider value={value}>{children}</Store.Provider>
}
