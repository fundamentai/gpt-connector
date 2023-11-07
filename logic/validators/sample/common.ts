import Joi from 'joi'
import { user } from '../user/user'

export const query = Joi.object({
    name: Joi.string()
})

export const sample = Joi.object({
    name: Joi.string(),
    age: Joi.number()
})

export const sampleRequired = sample.keys({
    name: Joi.string().required(),
    age: Joi.number().required()
})

export const base = Joi.object({
    user: user,
    body: sample,
    query: query
})
