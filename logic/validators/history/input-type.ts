import { message, relatedHistories, base } from './common'
import Joi from 'joi'

export const sendMessage = base.keys({
    body: Joi.alternatives(message.required(), Joi.array().items(message.required())).required()
})

export const newRelatedHistories = base.keys({
    body: relatedHistories.required()
})

export const addRelatedHistory = base.keys({
    query: Joi.object({
        relatedId: Joi.string().required()
    }).required(),
    body: Joi.object({
        historyId: Joi.string().required(),
        insert: Joi.number().default(-1)
    }).required()
})

export const deleteRelatedHistory = base.keys({
    query: Joi.object({
        historyId: Joi.string().required(),
        relatedId: Joi.string().required()
    }).required()
})

export const getMessages = base.keys({
    query: Joi.object({
        relatedId: Joi.string(),
        historyId: Joi.string()
    })
        .xor('relatedId', 'historyId')
        .required()
})

export const newHistory = base.keys({
    body: Joi.object({
        messages: Joi.array().items(message.required()).required()
    })
})
