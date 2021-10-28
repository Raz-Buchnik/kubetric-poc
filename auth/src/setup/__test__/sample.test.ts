import request from 'supertest'
import { app } from '../index'
import { User, Collections } from '../../models'
import { getCollection } from '../db'

it('should return a not found error', async () => {

  await request(app)
  .get(`/v1/sadasdhjsakdhasjkd`)
  .set('accept-language', 'en-US')
  .expect(404)

})

it('should return bad request error', async () => {

  const req = await request(app)
  .get(`/v1`)
  .set('accept-language', 'he-IL')
  .expect(400)

})

it('should connect to mongodb and make some actions', async () => {

  const user: User = {
    shared: {
      first_name: 'raz',
      last_name: 'buchnik',
      phone: '0509921014',
      email: 'razwebs@gmail.com'
    },
    meta: {
      created_at: new Date(),
      creator: {
        name: 'raz',
        ip: '127.0.0.1',
        // agent: 'macOS Chrome'
      }
    }
  }

  const usersCollection = getCollection(Collections.users)

  await usersCollection.insertOne(user)

  const selected_user = await usersCollection.findOne({ "shared.first_name": "raz" }) as User

  expect(selected_user.shared.phone).toBe('0509921014')
  expect(selected_user.shared.first_name).toEqual('raz')
  expect(selected_user.meta.creator.ip).toEqual('127.0.0.1')
  expect(selected_user.meta.creator.agent).toBeUndefined()

})