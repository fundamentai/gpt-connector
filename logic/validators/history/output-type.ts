import Joi from 'joi'

import { message } from './common'

export const sendMessage = Joi.alternatives(Joi.string(), Joi.boolean())
export const newRelatedHistories = Joi.alternatives(Joi.string(), Joi.boolean())
export const addRelatedHistory = Joi.boolean()
export const deleteRelatedHistory = Joi.boolean()
export const getMessages = Joi.array().items(message).required()
export const newHistory = Joi.string()
