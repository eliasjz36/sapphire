import { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'
import axios from 'axios'
import bcrypt from 'bcryptjs'

import { isAuth, signToken } from '../../../utils/auth'
import config from '../../../config'
import { User } from '../../../ts/interfaces/user.interfaces'

interface CustomNextApiRequest extends NextApiRequest {
  user: {
    id: string
    isAdmin: boolean
  }
}

interface Mutations {
  patch: {
    id: string
    set: {
      name: string
      email: string
      password?: string
    }
  }
}

const handler = nc()

handler.use(isAuth)

handler.put(async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN

  const mutations: Mutations[] = [
    {
      patch: {
        id: req.user.id,
        set: {
          name: req.body.name,
          email: req.body.email,
        },
      },
    },
  ]

  if (req.body.password)
    mutations[0].patch.set.password = bcrypt.hashSync(req.body.password)

  await axios.post(
    `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
    {
      mutations: mutations,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  )

  const user: User = {
    id: req.user.id,
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.user.isAdmin,
  }

  if (req.body.password) user.password = bcrypt.hashSync(req.body.password)

  const token = signToken(user)

  res.send({ ...user, token })
})

export default handler
