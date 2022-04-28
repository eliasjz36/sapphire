import axios from 'axios'

export const fetchCategories = async (setCategories: Function) => {
  try {
    const { data } = await axios.get(`/api/products/categories`)

    setCategories(data)
  } catch (error) {
    console.log((error as Error).message)
  }
}
