import { NextApiRequest, NextApiResponse } from 'next/types'

import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import axios from 'axios'

import { signToken } from '../../../utils/auth'
import client from '../../../utils/client'
import config from '../../../config'

import { User } from '../../../ts/interfaces/user.interfaces'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const projectId = config.projectId
  const dataset = config.dataset
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN
  const createMutations = [
    {
      create: {
        _type: 'user',
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ]

  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  )

  if (existUser) {
    return res.status(401).send({ message: 'Email already exists' })
  }

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  )
  const userId = data.results[0].id
  const user: User = {
    id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  }
  const token = signToken(user)

  res.send({ ...user, token })
})

export default handler
