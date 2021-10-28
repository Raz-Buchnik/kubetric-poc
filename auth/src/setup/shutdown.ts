import { Server } from 'http'
import { logger } from './logger'
import { closeServer, kafkaDisconnect } from './index'
import mongoose from 'mongoose'
import { Consumer, Producer } from 'kafkajs'

interface Attrs {
  consumer?: Consumer;
  producer?: Producer;
  server: Server;
}

export const shutdown = async ({
  consumer,
  producer,
  server
}: Attrs): Promise<void> => {

  // disconnect from kafka consumers and producers
  await kafkaDisconnect(producer, consumer)

  // close mongo
  await mongoose.disconnect()
  logger.info('mongo disconnected')

  // close express server
  await closeServer(server)

}