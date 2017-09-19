import requireAll from 'require-all'
import createMongooseModel from '../lib/create-mongoose-model'
let models
export const getModels = () => {
  if(!models){
    models = requireAll({
      dirname: __dirname,
      filter: /(.+Model)\.js$/,
      resolve: (model) => {
        return createMongooseModel(model.default)
      },
      map: (name, path) => {
        const [modelName] = name.split('Model')
        return modelName
      },
    })
  }
  return models
}

export default getModels()
