import Joi from 'joi'
/**
 *
 * @param {Server} server
 * @return {[{method, path, handler: (object|undefined)}]}
 */
export default (server) => {
  return [
    {
      method: 'POST',
      path: '/map/index',
      config: {
        description: 'Get Markers',
        tags: ['api', 'map', 'index'],
        validate: {
          payload: Joi.object({
            center: Joi.object({
              lat: Joi.number().required(),
              lng: Joi.number().required(),
            }).required(),
            viewBox: Joi.object({
              left: Joi.number().required(),
              right: Joi.number().required(),
              top: Joi.number().required(),
              bottom: Joi.number().required(),
            }).required(),
            type: Joi.string().required(),
            search: Joi.string(),
          }).label('Request'),
        },
        response: {
          schema: Joi.any().label('Result'),
        },
        plugins: {
          crumb: false,
        },
        auth: false,
      },
      handler: {
        controller: {
          name: 'MapController',
          method: 'index',
        },
      },
    },
    {
      method: 'POST',
      path: '/map/save',
      config: {
        description: 'Save Marker(place)',
        tags: ['api', 'map', 'save'],
        validate: {
          payload: Joi.object({
            position: Joi.object({
              lat: Joi.number().required(),
              lng: Joi.number().required(),
            }).required(),
            title: Joi.string().required(),
            place: Joi.object(),
          }).label('Request'),
        },
        response: {
          schema: Joi.any().label('Result'),
        },
        plugins: {
          crumb: false,
        },
        auth: false,
      },
      handler: {
        controller: {
          name: 'MapController',
          method: 'save',
        },
      },
    },
  ]
}
