import client from '../utils/client'

export const fetchProductsFiltered = async (
  category: string,
  query: string,
  price: string,
  rating: string,
  sort: string,
  setState: Function
): Promise<void> => {
  try {
    let gQuery = '*[_type == "product"'

    if (category !== 'all') gQuery += ` && category match "${category}" `

    if (query !== 'all') gQuery += ` && name match "${query}" `

    if (price !== 'all' && typeof price === 'string') {
      const minPrice = Number(price.split('-')[0])
      const maxPrice = Number(price.split('-')[1])

      gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`
    }

    if (rating !== 'all') gQuery += ` && rating >= ${Number(rating)} `

    let order = ''

    if (sort !== 'default') {
      if (sort === 'lowest') order = '| order(price asc)'
      if (sort === 'highest') order = '| order(price desc)'
      if (sort === 'toprated') order = '| order(rating desc)'
    }
    gQuery += `] ${order}`

    setState({ loading: true })

    const products = await client.fetch(gQuery)

    setState({ products, loading: false })
  } catch (error) {
    setState({ error: (error as Error).message, loading: false })
  }
}
