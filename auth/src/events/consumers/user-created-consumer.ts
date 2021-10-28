import { Consumer } from 'kafkajs';
import { Topics } from '../index';
import { kafka, logger } from "../../setup";

export const userCreatedConsumer = async (): Promise<Consumer> => {

  const consumer = await kafka.createConsumer()

  await consumer.subscribe({
    topic: Topics.UserWasCreated,
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({
      topic,
      partition,
      message
    }) => {

      logger.info(topic)
      logger.info(partition)
      logger.info(message.value.toString())

      // this controller will run a service
      // to handle that a user was created,
      // add it to the db for example

    }
  })

  return consumer

}