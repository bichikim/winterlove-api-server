import mongoose from 'mongoose'
import _ from 'lodash'
const createPreMiddleware = (schema, modelClass) => {
  const createPre = (item, key) => {
    schema.pre(key, function(next){
      // eslint-disable-next-line no-invalid-this
      item({next, document: this})
    })
  }
  if(_.isObject(modelClass.pre)){
    _.forEach(modelClass.pre, (preItem, key) => {
      if(_.isFunction(preItem)){
        createPre(preItem, key)
      }
      if(_.isArray(preItem)){
        _.forEach(preItem, (preItemItem) => {
          createPre(preItemItem, key)
        })
      }
    })
  }
}
const createPostMiddleware = (schema, modelClass) => {
  if(_.isObject(modelClass.post)){
    _.forEach(modelClass.post, (item, key) => {
      if(_.isFunction(item)){
        schema.post(key, function(document){
          // eslint-disable-next-line no-invalid-this
          item({document})
        })
      }
    })
  }
}
export default (modelClass) => {
  const schema = new mongoose.Schema(modelClass.schema)
  createPreMiddleware(schema, modelClass)
  createPostMiddleware(schema, modelClass)
  schema.loadClass(modelClass)
  return mongoose.model(modelClass.db, schema)
}
