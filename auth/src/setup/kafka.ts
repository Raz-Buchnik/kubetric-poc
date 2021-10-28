import { Consumer, Kafka, Producer } from 'kafkajs'
import { logger } from '.'
import { userCreatedConsumer } from '../events'

let consumer: Consumer
let producer: Producer
let kafka: Kafka
let alreadySubscribedConsumersToTopics: boolean = false

// init kafka method
export const init = async (): Promise<{
  consumer: Consumer
  producer: Producer
}> => {
  // create kafka object
  kafka = createInstance()
  // create consumer
  consumer = await createConsumer()
  // create producer
  producer = await createProducer()
  // subscribe consumers to topics
  await subscribeConsumerToTopics()
  return { consumer, producer }
}

export const createInstance = (): Kafka =>
  new Kafka({
    brokers: ['my-release-kafka:9092'],
  })

export const createConsumer = async (): Promise<Consumer> => {
  if (consumer) return consumer
  consumer = kafka.consumer({ groupId: 'auth' })
  await consumer.connect()
  return consumer
}

export const createProducer = async (): Promise<Producer> => {
  if (producer) return producer
  producer = kafka.producer()
  await producer.connect()
  return producer
}

export const subscribeConsumerToTopics = async (): Promise<void> => {
  if (alreadySubscribedConsumersToTopics) {
    return
  }
  await userCreatedConsumer()
}

export const disconnect = async (producer?: Producer, consumer?: Consumer) => {
  for (const item of [consumer, producer]) {
    logger.info(`[disconnected from kafka producer and/or consumer]`)
    await item.disconnect()
  }
}
