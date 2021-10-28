import { Request, Response, NextFunction } from "express"
import { logger } from './logger'
import { ServerError, CastError } from "razaviv-common"

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

  const castError = errorHandler(err)
  
  res.status(castError.error.code).json(castError)

  res.end()

}

export const errorHandler = (err: any): CastError => {

  // if err is not operational - a programmer error
  // 1. log it.
  // 2. overwrite it with a server error.
  if (err?.is_operational !== true) {
    if (err instanceof SyntaxError) {
      logger.error(`SyntaxError was just catched by express errors middleware:`, err)
    } else if (err instanceof RangeError) {
      logger.error(`RangeError was just catched by express errors middleware:`, err)
    } else if (err instanceof ReferenceError) {
      logger.error(`ReferenceError was just catched by express errors middleware:`, err)
    } else if (err instanceof TypeError) {
      logger.error(`TypeError was just catched by express errors middleware:`, err)
    } else if (err instanceof URIError) {
      logger.error(`URIError was just catched by express errors middleware:`, err)
    } else if (err instanceof Error) {
      logger.error(`Error was just catched by express errors middleware:`, err)
    }
    err = new ServerError()
  }

  // escape is_operational from the client - if any
  try {
    delete err.is_operational
  } catch (err) {}

  // get cast instance
  return new CastError(err)

}