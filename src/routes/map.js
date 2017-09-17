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
      path: '/map/create',
      config: {
        description: 'Create Marker(place)',
        tags: ['api', 'map', 'create'],
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
          method: 'create',
        },
      },
    },
    {
      method: 'POST',
      path: '/map/update',
      config: {
        description: 'Update Marker(place)',
        tags: ['api', 'map', 'update'],
        validate: {
          payload: Joi.object({
            id: Joi.string().required(),
            position: Joi.object({
              lat: Joi.number(),
              lng: Joi.number(),
            }),
            title: Joi.string(),
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
          method: 'update',
        },
      },
    },
    {
      method: 'POST',
      path: '/map/delete',
      config: {
        description: 'Update Marker(place)',
        tags: ['api', 'map', 'delete'],
        validate: {
          payload: Joi.object({
            id: Joi.string().required(),
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
          method: 'delete',
        },
      },
    },
  ]
}
