import { NextApiRequest, NextApiResponse } from 'next/types'

import axios from 'axios'
import moment from 'moment'
import nc from 'next-connect'

import { isAuth } from '../../../utils/auth'
import config from '../../../config'

import { User } from '../../../ts/interfaces/user.interfaces'

interface OrderNextApiRequest extends NextApiRequest {
  user: User
}

const handler = nc()

handler.use(isAuth)

handler.post(async (req: OrderNextApiRequest, res: NextApiResponse) => {
  const projectId = config.projectId
  const dataset = config.dataset
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: [
        {
          create: {
            _type: 'order',
            createdAt: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
            ...req.body,
            userName: req.user.name,
            user: {
              _type: 'reference',
              _ref: req.user.id,
            },
          },
        },
      ],
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  )

  res.status(201).send(data.results[0].id)
})
export default handler
