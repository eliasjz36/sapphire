interface Error {
  response?: { data: { message: string } }
  message: string
}

const getError = (error: Error): string =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message

export { getError }
