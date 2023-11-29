import { user } from '../user/user'
import Joi from 'joi'

export const message = Joi.object({
    content: Joi.string().required(),
    role: Joi.string().valid('function', 'user', 'system', 'assistant').required(),
    date: Joi.date()
})

export const history = Joi.object({
    messages: Joi.array().items(message).required()
})

export const relatedHistories = Joi.object({
    histories: Joi.array().items(Joi.string()).required()
})

export const base = Joi.object({
    body: Joi.object().required(),
    query: Joi.object({
        id: Joi.string()
    }).required(),
    user: user
})
