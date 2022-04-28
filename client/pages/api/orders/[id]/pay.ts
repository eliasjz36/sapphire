import { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import nc from 'next-connect'
import moment from 'moment'

import { isAuth } from '../../../../utils/auth'
import config from '../../../../config'

const handler = nc()

handler.use(isAuth)
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN

  await axios.post(
    `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
    {
      mutations: [
        {
          patch: {
            id: req.query.id,
            set: {
              isPaid: true,
              paidAt: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
              'paymentResult.id': req.body.id,
              'paymentResult.status': req.body.email_address,
              'paymentResult.email_address': req.body.id,
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

  res.send({ message: 'order paid' })
})

export default handler
