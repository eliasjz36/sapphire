import { NextApiRequest, NextApiResponse } from 'next/types'

import jwt, { Secret } from 'jsonwebtoken'

import { User } from '../ts/interfaces/user.interfaces'

const signToken = (user: User) => {
  return jwt.sign(user, process.env.JWT_SECRET as Secret, {
    expiresIn: '30d',
  })
}

interface CustomNextApiRequest extends NextApiRequest {
  user: User
}

const isAuth = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(
      token,
      process.env.JWT_SECRET as Secret,
      (error: any, decode: any) => {
        if (error) {
          res.status(401).send({ message: 'Token is not valid' })
        } else {
          req.user = decode
          next()
        }
      }
    )
  } else {
    res.status(401).send({ message: 'Token is not suppiled' })
  }
}
export { signToken, isAuth }
