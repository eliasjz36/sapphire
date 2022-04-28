import { FetchActionKind } from '../enums/order.enums'

export interface OrderScreenProps {
  params: {
    id: string
  }
}

export interface OrderAction {
  type: FetchActionKind
  payload?: any
}

export interface OrderState {
  loading: boolean
  order: {}
  error: string
  successPay: boolean
}

export interface OrderHistoryState {
  loading: boolean
  orders: string[]
  error: string
}
