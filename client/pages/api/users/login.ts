import { NextApiRequest, NextApiResponse } from 'next/types'

import nc from 'next-connect'
import bcrypt from 'bcryptjs'

import { signToken } from '../../../utils/auth'
import client from '../../../utils/client'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: req.body.email,
  })

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    })
  } else {
    res.status(404).send({ message: 'Invalid email or password' })
  }
})

export default handler
