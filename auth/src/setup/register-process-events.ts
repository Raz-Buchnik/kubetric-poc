import { logger, shutdown } from './index'
import { Consumer, Producer } from 'kafkajs'
import { Server } from 'http'

interface Attrs {
  consumer?: Consumer;
  producer?: Producer;
  server: Server
}

export const registerProcessEvents = ({
  consumer,
  producer,
  server
}: Attrs) => {
  // unhandled exception - gracefully restart
  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', err)
    process.emit('SIGTERM', 'SIGTERM')
  })

  // unhandledRejection
  process.on('unhandledRejection', (err) => {
    logger.error('unhandledRejection', err)
    process.emit('SIGTERM', 'SIGTERM')
  })

  // sigterm - gracefully shut down
  process.on('SIGTERM', async () => {
    logger.info(`[SIGTERM received, shutting down the server gracefully]`)
    try {
      await shutdown({ server, consumer, producer })
      process.exit(0)
    } catch (err) {
      logger.error('SIGTERM could not shut down the server', err)
      process.emit('SIGINT', 'SIGINT')
    }
  })

  // sigint - kill
  process.on('SIGINT', () => {
    logger.info(`[SIGINT received, shutting the server down]`)
    process.exit(0)
  })

  // on exit
  process.on('exit', () => {
    logger.info(`[Node process was exited]`)
  })
}
