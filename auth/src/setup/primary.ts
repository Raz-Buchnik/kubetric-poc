import cluster from 'cluster'
import { cpus } from 'os'
import { logger } from './index'

export const primary = () => {

  // detect cpus length in order to establish workers
  const numCPUs = cpus().length

  // emit info log
  logger.info(`primary ${process.pid} is running`)

  // fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // when worker dies, refork
  cluster.on('exit', (worker) => {
    logger.info(`worker ${worker.process.pid} died, forking a new one`)
    cluster.fork()
  })
  
}
