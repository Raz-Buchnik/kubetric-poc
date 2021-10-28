import { Application } from 'express'
import { Server } from 'http'
import { logger } from './index'

export const initServer = (app: Application): Promise<Server> => {
  return new Promise(async (resolve, reject) => {
    try {
      const server = app.listen(process.env.PORT, () => {
        logger.info(`Connected and listen on: ${process.env.PORT}`)
        resolve(server)
      })
    } catch (err) {
      return reject(err)
    }
  })
}

export const closeServer = (server: Server): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      server.close(() => {
        logger.info('express server has been closed')
        resolve()
      })
    } catch (err) {
      return reject(err)
    }
  })
}
