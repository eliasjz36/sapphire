export interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  token?: string
  password?: string
}
