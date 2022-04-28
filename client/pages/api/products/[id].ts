import { NextApiRequest, NextApiResponse } from 'next/types'

import nc from 'next-connect'

import client from '../../../utils/client'

import { Product } from '../../../ts/interfaces/product.interfaces'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  const product: Product = await client.fetch(
    `*[_type == "Product" && _id == $id][0]`,
    {
      id: req.query.id,
    }
  )
  res.send(product)
})

export default handler
