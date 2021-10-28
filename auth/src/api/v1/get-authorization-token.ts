import express, { Request, Response, NextFunction } from 'express'
import { CastSuccess } from 'razaviv-common'
import { getAuthorizationToken } from '../../services'

interface RequestQuery extends Request {
  query: {
    phone_number: string,
    code: string
  }
}

const verifySmsController = express.Router()

verifySmsController.get('/authorization-token', async (req: RequestQuery, res: Response, next: NextFunction) => {
  try {

    res.json(
      new CastSuccess({
        data: await getAuthorizationToken({
          phone_number: req.query.phone_number,
          code: req.query.code
        })
      })
    )

  } catch (err) {
    next(err)
  }
})

export { verifySmsController }
