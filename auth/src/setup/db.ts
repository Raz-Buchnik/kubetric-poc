import { MongoClient, Db, Collection } from 'mongodb'
import { Collections } from '../models'
import { logger } from './index'

let db: Db

export const connectDb = async (): Promise<void> => {

  if (db) return
  logger.info('Connecting to mongo...')
  const client = await MongoClient.connect(process.env.MONGO_DB_URI)
  db = client.db('auth')
  logger.info('Connected to mongo!')

}

export const getDb = (): Db => db

export const getCollection = (collectionName: Collections): Collection => getDb().collection(collectionName)