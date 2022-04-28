import { CartActionKind } from '../enums/cart.enums'
import { ShippingFormData } from './shipping.interfaces'
import { User } from './user.interfaces'

export interface CartAction {
  type: CartActionKind
  payload?: CartItem | User | ShippingFormData | string
}

export interface CartItem {
  _key: string
  name: string
  countInStock: number
  slug: string
  price: number
  image: string
  quantity: number
}

export interface CartState {
  cart: {
    cartItems: CartItem[]
    shippingAddress: ShippingFormData
    paymentMethod: string
  }
  userInfo: User
}
