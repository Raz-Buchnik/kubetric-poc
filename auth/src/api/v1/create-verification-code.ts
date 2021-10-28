import express, { Request, Response, NextFunction } from 'express'
import { CastSuccess } from 'razaviv-common'
import { createVerificationCode } from '../../services'

interface RequestQuery extends Request {
  body: {
    phone_number: string
  }
}

const requestSmsController = express.Router()

requestSmsController.post('/verification-code', async (req: RequestQuery, res: Response, next: NextFunction) => {
  try {

    await createVerificationCode({
      phone_number: req.body.phone_number
    })

    res.json(
      new CastSuccess()
    )

  } catch (err) {
    next(err)
  }
})

export { requestSmsController }
