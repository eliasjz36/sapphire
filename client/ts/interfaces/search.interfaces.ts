import { NextRouter } from 'next/router'

export interface State {
  categories?: []
  products?: []
  error?: string
  loading?: boolean
}

export interface FilterSearch {
  category?: string
  sort?: string
  min?: string
  max?: string
  searchQuery?: string
  price?: string
  rating?: string
  query?: string
  router?: NextRouter
}
