/* global __dirname*/
import env from '../lib/env'
const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = '1777',
} = env

export default {
  HOST: SERVER_HOST,
  PORT: SERVER_PORT,
  LABELS: 'server',
  CORS: true,
}
