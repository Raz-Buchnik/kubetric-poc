import { Topics } from '..'
import { kafka } from '../../setup'

export const userWasSignedInProducer = async (): Promise<void> => {

  const producer = await kafka.createProducer()
  
  await producer.send({
    topic: Topics.UserWasSignedIn,
    messages: [
      {
        value: 'user was signed in!'
      }
    ]
  })

}