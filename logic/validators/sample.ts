import Joi from 'joi'

export const query = Joi.object({
    name: Joi.string().required()
})

export const queryAll = Joi.object({
    name: Joi.string()
})

export const createSample = Joi.object({
    query: Joi.object({}),
    body: Joi.object({
        name: Joi.string().required(),
        age: Joi.number()
    }).required()
})

export const updateSample = Joi.object({
    query: query,
    body: Joi.object({
        name: Joi.string(),
        age: Joi.number()
    })
})

export const deleteSample = Joi.object({
    query: query.required()
})

export const getSample = Joi.object({
    query: query.required()
})

export const getSamples = Joi.object({
    query: queryAll.required()
})
