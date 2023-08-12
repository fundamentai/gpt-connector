import Joi from 'joi'

export const message = Joi.object({
    content: Joi.string().required(),
    role: Joi.allow('user', 'system', 'assistant').required()
})

export const systemMessage = Joi.object({
    key: Joi.string().required(),
    content: Joi.string().required(),
    role: Joi.string().default('system')
})

export const history = Joi.object({
    messages: Joi.array().items(message).required()
})
