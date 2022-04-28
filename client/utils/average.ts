const average = (rating: number, number: number): string => {
  return rating >= number ? 'text-yellow-300' : 'text-gray-200'
}

export default average
