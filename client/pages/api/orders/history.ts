import { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'

import { isAuth } from '../../../utils/auth'
import client from '../../../utils/client'

interface CustomNextApiRequest extends NextApiRequest {
  user: {
    id: string
  }
}

const handler = nc()

handler.use(isAuth)

handler.get(async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const orders = await client.fetch(
    `*[_type == "order" && user._ref == $userId]`,
    {
      userId: req.user.id,
    }
  )

  res.send(orders)
})
export default handler
