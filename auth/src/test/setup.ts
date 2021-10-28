import dotenv from 'dotenv'
dotenv.config()
import { worker, ensureEnvs, shutdown } from '../setup'
import { Server } from 'http'

let server: Server

jest.mock('../setup/db')

beforeAll(async () => {
  ensureEnvs()
  server = await worker()
})

afterAll(async () => {
  await shutdown({ server })
})
