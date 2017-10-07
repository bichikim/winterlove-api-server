export const encodeBase64ID = (id) => {
  return id && new Buffer(id.toString(), 'hex')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_') || id
}

export const decodeBase64ID = (id) => {
  return id && new Buffer(id.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
    .toString('hex') || id
}

