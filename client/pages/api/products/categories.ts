import { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const categories = ['Shirts', 'Pants']

  res.send(categories)
})

export default handler
