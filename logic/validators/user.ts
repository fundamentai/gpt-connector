import * as Joi from 'joi'

export const user = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    permissions: Joi.any().required()
})

export const login = Joi.object({
    //jwt token regex
    token: Joi.string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
})
