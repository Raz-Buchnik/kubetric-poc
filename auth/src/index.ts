import dotenv from 'dotenv'
dotenv.config()
import cluster from 'cluster'
import { ensureEnvs, worker, primary } from './setup'

// ensure environment variables
ensureEnvs()

// init the cluster, primary and worker
const isPrimary = cluster.isMaster || cluster.isPrimary

if (process.env.NODE_ENV == 'production' && isPrimary) {
  primary()
} else {
  worker()
}