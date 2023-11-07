import Joi from 'joi'

import { sample, base, query } from './common'

export const createSample = base.keys({
    body: sample
        .keys({
            name: Joi.string().required(),
            age: Joi.number().required()
        })
        .required()
})

export const updateSample = base.keys({
    query: query.required(),
    body: sample.required()
})

export const deleteSample = base.keys({
    query: query.required()
})

export const getSample = base.keys({
    query: query.required()
})

export const getSamples = base.keys({
    query: query.required()
})
