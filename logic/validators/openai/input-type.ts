import Joi from 'joi'

import { base, openai } from './common'
import { message } from '../history/common'

export const completion = base.keys({
    query: Joi.object({
        relatedId: Joi.string(),
        historyId: Joi.string()
    })
        .xor('relatedId', 'historyId')
        .required(),
    body: Joi.object({
        openai: openai,
        apiKey: Joi.string().required(),
        historyId: Joi.string(), // if history id is definied, message and gpt response will be added to history
        message: message.required()
    }).required()
})
