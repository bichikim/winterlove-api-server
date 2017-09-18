import Joi from 'joi'
const SchemaItems = {
  name: Joi.string().min(3).max(40),
  email: Joi.string().email().max(150),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/),
  point: Joi.number(),
  gender: Joi.string(),
  accessToken: Joi.string(),
}
/**
 *
 * @param {Server} server
 * @return {[{method, path, handler: (object|undefined)}]}
 */
export default (server) => {
  return [
    {
      method: 'POST',
      path: '/sign-in',
      config: {
        description: 'Sign in',
        tags: ['api', 'auth'],
        validate: {
          payload: Joi.object({
            email: SchemaItems.email.required(),
            password: Joi.string().required(),
            isNeedAccessToken: Joi.boolean(),
          }).label('Sign in Request'),
        },
        response: {
          schema: Joi.object({
            gender: SchemaItems.gender.required(),
            point: SchemaItems.point.required(),
            email: SchemaItems.email.required(),
            name: SchemaItems.name.required(),
            accessToken: SchemaItems.accessToken,
          }).label('Result'),
        },
        plugins: {
          crumb: true,
        },
        auth: {
          mode: 'try',
        },
      },
      handler: {
        controller: {
          name: 'AuthController',
          method: 'signIn',
        },
      },
    },
    {
      method: 'POST',
      path: '/sign-up',
      config: {
        description: 'Sign up',
        tags: ['api', 'auth'],
        validate: {
          payload: Joi.object({
            name: SchemaItems.name.required(),
            email: SchemaItems.email.required(),
            password: SchemaItems.password.required(),
            gender: SchemaItems.gender,
          }).label('Sign up Request'),
        },
        response: {
          schema: Joi.object({
            gender: SchemaItems.gender,
            point: SchemaItems.point.required(),
            email: SchemaItems.email,
            name: SchemaItems.name,
            accessToken: SchemaItems.accessToken,
          }).label('Result'),
        },
        plugins: {
          crumb: true,
        },
        auth: false,
      },
      handler: {
        controller: {
          name: 'AuthController',
          method: 'signUp',
        },
      },
    },
    {
      method: 'POST',
      path: '/update',
      config: {
        description: 'Update account',
        tags: ['api', 'auth', 'update'],
        validate: {
          payload: Joi.object({
            email: SchemaItems.email.required(),
            password: Joi.string().required(),
            name: SchemaItems.name,
            nextPassword: SchemaItems.password,
            gender: SchemaItems.gender,
          }).label('Sign update Request'),
        },
        response: {
          schema: Joi.object({
            success: Joi.boolean(),
          }).label('Result'),
        },
        plugins: {
          crumb: true,
        },
        auth: false,
      },
      handler: {
        controller: {
          name: 'AuthController',
          method: 'update',
        },
      },
    },
    {
      method: 'POST',
      path: '/delete',
      config: {
        description: 'Delete account',
        tags: ['api', 'auth', 'delete'],
        validate: {
          payload: Joi.object({
            email: SchemaItems.email.required(),
            password: SchemaItems.password.required(),
          }).label('Sign delete Request'),
        },
        response: {
          schema: Joi.object({
            success: Joi.boolean(),
          }).label('Result'),
        },
        plugins: {
          crumb: true,
        },
        auth: false,
      },
      handler: {
        controller: {
          name: 'AuthController',
          method: 'delete',
        },
      },
    },
  ]
}
