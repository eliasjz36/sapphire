import {
  LoginInputs,
  ProfileInputs,
  RegisterInputs,
  ShippingInputs,
} from '../ts/interfaces/inputs.interfaces'

export const loginInputs: LoginInputs[] = [
  {
    label: 'Email',
    htmlFor: 'email',
    placeHolder: 'Email Address',
    id: 'email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    label: 'Password',
    htmlFor: 'password',
    placeHolder: 'Password',
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
  },
]

export const profileInputs: ProfileInputs[] = [
  {
    label: 'Name',
    htmlFor: 'name',
    placeHolder: 'Name',
    id: 'name',
    type: 'text',
    autoComplete: 'name',
  },
  {
    label: 'Email',
    htmlFor: 'email',
    placeHolder: 'Email Address',
    id: 'email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    label: 'Password',
    htmlFor: 'password',
    placeHolder: 'Password',
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
  },
  {
    label: 'Password Confirmation',
    htmlFor: 'passwordConfirmation',
    placeHolder: 'Password Confirmation',
    id: 'passwordConfirmation',
    type: 'password',
    autoComplete: 'current-password',
  },
]

export const registerInputs: RegisterInputs[] = [
  {
    label: 'Name',
    htmlFor: 'name',
    placeHolder: 'Name',
    id: 'name',
    type: 'text',
    autoComplete: 'name',
  },
  {
    label: 'Email',
    htmlFor: 'email',
    placeHolder: 'Email Address',
    id: 'email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    label: 'Password',
    htmlFor: 'password',
    placeHolder: 'Password',
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
  },
  {
    label: 'Password Confirmation',
    htmlFor: 'passwordConfirmation',
    placeHolder: 'Password Confirmation',
    id: 'passwordConfirmation',
    type: 'password',
    autoComplete: 'current-password',
  },
]

export const shippingInputs: ShippingInputs[] = [
  {
    label: 'Full Name',
    htmlFor: 'fullName',
    id: 'fullName',
    type: 'text',
    autoComplete: 'name',
  },
  {
    label: 'Street address',
    htmlFor: 'address',
    id: 'address',
    type: 'text',
    autoComplete: 'address-line1',
  },
  {
    label: 'Country',
    htmlFor: 'country',
    id: 'country',
    type: 'text',
    autoComplete: 'country-name',
  },
  {
    label: 'City',
    htmlFor: 'city',
    id: 'city',
    type: 'text',
    autoComplete: 'street-address',
  },
  {
    label: 'ZIP / Postal Code',
    htmlFor: 'postalCode',
    id: 'postalCode',
    type: 'number',
    autoComplete: 'postal-code',
  },
]
