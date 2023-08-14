import Joi from 'joi'
import { joiObjectId } from 'ts-joi-objectid'

const objectId = joiObjectId(Joi)

export const getSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    }).required()
})

export const getSystemMessages = Joi.object({
    query: Joi.object({
        key: Joi.string()
    }).required()
})

export const createSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    }).required(),
    body: Joi.object({
        id: objectId().required()
    }).required()
})

export const deleteSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    }).required()
})

export const updateSystemMessage = Joi.object({
    query: Joi.object({
        key: Joi.string().required()
    }).required(),
    body: Joi.object({
        id: objectId().required()
    }).required()
})
