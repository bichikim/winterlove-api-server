/* global global */
import path from 'path'
import env from '../lib/env'

const root = path.join(__dirname, '../../')
const {
  CLIENT_STATIC_PATH = 'static',
  CLIENT_PATH = 'winterlove-client',
} = env

export default {
  CONFIG: path.join(root, 'src/config'),
  client: {
    STATIC_PATH: CLIENT_STATIC_PATH,
    PUBLIC: path.join(root, '..', CLIENT_PATH, 'public'),
  },
  server: {
    ROOT: root,
  },
}
