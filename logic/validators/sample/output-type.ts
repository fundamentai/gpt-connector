import Joi from 'joi'

import { sampleRequired } from './common'

export const getSample = sampleRequired

export const createSample = sampleRequired

export const updateSample = Joi.boolean().required()

export const deleteSample = Joi.boolean().required()

export const getSamples = Joi.array().items(getSample).required()
