import { sign, verify } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const secret = process.env.JWT_SECRET || "5d0f7a27fe8a66efe169db0023307a234a54f0630d20f2df35258f9b427e29f74bba7caec56fe8d328a939d14c64df39748bf46ab778f73053549901c6198e4c"

export const createToken = (user: any) => {
  const token = sign(user, secret, {
    expiresIn: '24h',
  });
  return token;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log(req.headers)
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) res.sendStatus(401)
  else {
    verify(token, secret, (err: any, user: any) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      next()
    })
  }
}
