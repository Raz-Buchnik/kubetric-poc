import {
  app,
  registerProcessEvents,
  httpLogger,
  localeMiddleware,
  localeHandler,
  initServer,
  connectDb,
  kafka
} from './index'
import helmet from 'helmet'
import cors from 'cors'
import { Server } from 'http'
import { errorMiddleware } from './errors'
import { notFoundRouter } from 'razaviv-common'
import { apiRouter } from '../api'

export const worker = async (): Promise<Server> => {

  // kafka
  const { consumer, producer } = await kafka.init()

  // mongo
  await connectDb()

  // settings
  app.set('json spaces', 4)

  // helmet
  app.use(helmet())

  // cors
  app.use(cors())

  // locale middleware
  app.use(localeMiddleware(localeHandler))

  // http loger
  app.use(httpLogger)

  // router
  app.use(apiRouter)

  // errors middleware
  app.use(errorMiddleware)

  // not found router
  app.use(notFoundRouter)

  // server
  const server = await initServer(app)

  // register process events, like SIGNINT SIGKILL, uncaughtRejections, etc...
  registerProcessEvents({ server, consumer, producer })

  return server

}
