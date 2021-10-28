import express from 'express'
import { verifySmsController } from './get-authorization-token'

const v1Router = express.Router()

v1Router.use('/v1', [
  verifySmsController
])

export { v1Router }
