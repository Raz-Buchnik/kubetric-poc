import { MongoClient, Db, Collection } from 'mongodb'
import { logger } from '../index'
import { MongoMemoryServer } from 'mongodb-memory-server'

let db: Db

export const connectDb = async (): Promise<void> => {

  if (db) return
  logger.info('Connecting to mongo...')
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  const client = await MongoClient.connect(uri)
  db = client.db('auth')
  logger.info('Connected to mongo! ON TEST ENV!!!')

}

export const getDb = (): Db => db

export const getCollection = (collectionName: string): Collection => getDb().collection(collectionName)