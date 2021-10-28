import { ensureEnvVars } from 'razaviv-common'

export const ensureEnvs = () => {
  
  ensureEnvVars(['NODE_ENV', 'PORT', 'SECRET_KEY', 'MONGO_DB_URI'])
  
}