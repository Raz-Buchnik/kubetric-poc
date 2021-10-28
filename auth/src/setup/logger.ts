import winston from 'winston'
import morgan from 'morgan'
import morganJson from 'morgan-json'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  exitOnError: false,
  handleExceptions: false
})

if (process.env.NODE_ENV != 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.cli()
    })
  )
}

const format = morganJson({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})

export const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message)

      logger.info('HTTP Access Log', {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime)
      })
    }
  }
})