import Joi from 'joi'
const SchemaItems = {
  name: Joi.string().min(3).max(40),
  email: Joi.string().email().max(150),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/),
  gender: Joi.string(),
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
          }).label('Sign'),
        },
        response: {
          schema: Joi.object({
            success: Joi.boolean(),
            data: Joi.object({
              gender: SchemaItems.gender.required(),
              point: Joi.number().required(),
              email: SchemaItems.email.required(),
              name: SchemaItems.name.required(),
              access_token: Joi.string(),
            }),
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
          payload: Joi.object().keys({
            name: SchemaItems.name.required(),
            email: SchemaItems.email.required(),
            password: SchemaItems.password.required(),
            gender: SchemaItems.gender,
          }).label('Sign'),
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
          method: 'signUp',
        },
      },
    },
  ]
}
