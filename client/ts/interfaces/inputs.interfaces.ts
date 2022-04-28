import {
  LoginIdType,
  ProfileIdType,
  RegisterIdType,
  ShippingIdType,
} from '../types/id.types'

export interface LoginInputs {
  label: string
  htmlFor: string
  placeHolder?: string
  id: LoginIdType
  type: string
  autoComplete: string
}

export interface ProfileInputs {
  placeHolder?: string
  htmlFor: string
  id: ProfileIdType
  type: string
  label: string
  autoComplete: string
}

export interface RegisterInputs {
  placeHolder?: string
  htmlFor: string
  id: RegisterIdType
  type: string
  label: string
  autoComplete: string
}

export interface ShippingInputs {
  label: string
  htmlFor: string
  id: ShippingIdType
  type: string
  autoComplete: string
}
