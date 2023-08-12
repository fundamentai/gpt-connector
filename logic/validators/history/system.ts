import Joi from 'joi'
import { systemMessage, message } from './common'

export const getSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    })
})

export const getSystemMessages = Joi.object({
    query: Joi.object({
        key: Joi.string()
    })
})

export const createSystemMessage = Joi.object({
    query: Joi.object({}),
    body: systemMessage
})

export const deleteSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    })
})

export const updateSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    }),
    body: systemMessage
})
