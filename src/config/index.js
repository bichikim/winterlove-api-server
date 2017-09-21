import env from 'bichi-env'
import path from 'path'
const root = path.join(__dirname, '../../')
const {
  AUTH_STRATEGY = 'jwt',
  APP_KEY = '9JTxCSYh/UnXsH5DhZRtKGlQFw8AwLAliHl/T9ZtQeo=',
  APP_NAME = 'Winter Love',
  APP_ENV = 'production',
  TLS_KEY = null,
  TLS_CERT = null,
  CLIENT_STATIC_PATH = 'static',
  CLIENT_ROOT_PATH = 'winterlove-client',
  CLIENT_PUBLIC_PATH = 'public',
  CLIENT_INDEX_FILE = 'index.html',
  DB_DATABASE = 'winterlove',
  DB_HOST = '127.0.0.1',
  DB_PASSWORD = 'dev-12345',
  DB_PORT = '27017',
  DB_USER = 'admin',
  SERVER_FILES_PATH = 'files',
  SERVER_PROTOCOL = 'http',
  SERVER_HOST = 'localhost',
  SERVER_PORT = '1777',
  SERVER_LABELS = 'server',
  SERVER_CORS = true,
  EVENT_PROTOCOL = 'http',
  EVENT_HOST = 'localhost',
  EVENT_PORT = '33333',
  EVENT_LABELS = 'event',
} = env()

const config = {
  app: {
    name: APP_NAME,
    isProduction: APP_ENV === 'production',
  },
  auth: {
    key: APP_KEY,
    strategy: AUTH_STRATEGY,
  },
  tls: {
    key: TLS_KEY,
    cert: TLS_CERT,
  },
  database: {
    database: DB_DATABASE,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
    user: DB_USER,
  },
  file: {
    allow: ['jpg', 'svg', 'eot', 'ttf', 'png', 'bmp', 'gif', 'woff2', 'woff', 'css', 'json', 'ico', 'map', 'js'],
  },
  server: {
    protocol: SERVER_PROTOCOL,
    host: SERVER_HOST,
    port: SERVER_PORT,
    labels: SERVER_LABELS,
    cors: SERVER_CORS,
  },
  client: {
    indexFileName: CLIENT_INDEX_FILE,
    staticName: CLIENT_STATIC_PATH,
    publicName: CLIENT_PUBLIC_PATH,
  },
  event: {
    protocol: EVENT_PROTOCOL,
    port: EVENT_PORT,
    host: EVENT_HOST,
    labels: EVENT_LABELS,
  },
  path: {
    client: {
      static: path.join(root, '..', CLIENT_ROOT_PATH, CLIENT_PUBLIC_PATH, CLIENT_STATIC_PATH),
      root: path.join(root, '..', CLIENT_ROOT_PATH, CLIENT_PUBLIC_PATH),
    },
    server: {
      files: path.join(root, SERVER_FILES_PATH),
      root,
    },
  },
}

export default config
