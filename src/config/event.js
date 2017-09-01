import env from '../lib/env'
const {
  EVENT_HOST = 'localhost',
  EVENT_PORT = '33333',
} = env

export default {
  HOST: EVENT_HOST,
  PORT: EVENT_PORT,
  LABELS: 'event',
}
