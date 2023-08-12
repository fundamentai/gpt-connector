import Joi from 'joi'
import { systemMessage, message } from './common'

export const getHistory = Joi.object({
    query: Joi.object({
        id: Joi.string().required()
    }),
    body: Joi.object({})
})

export const createHistory = Joi.object({
    query: Joi.object({}),
    body: message
})

export const addMessage = Joi.object({
    query: Joi.object({
        id: Joi.string().required()
    }),
    body: message
})

export * from './system'
export * from './common'
