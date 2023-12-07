import Joi from 'joi'

export const user = Joi.object({
    permissions: Joi.any()
})

export const login = Joi.object({
    //jwt token regex
    token: Joi.string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
})
