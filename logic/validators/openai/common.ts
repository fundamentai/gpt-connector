import Joi from 'joi'

import { user } from '../user/user'

export const openai = Joi.object({
    model: Joi.string().default('gpt-4'),
    functions: Joi.array().items(Joi.string()),
    function_call: Joi.object({}),
    temperature: Joi.number().min(0).max(2),
    top_p: Joi.number().min(0).max(1),
    n: Joi.number().integer().min(1),
    stream: Joi.boolean(),
    stop: Joi.object({}),
    max_tokens: Joi.number().integer().min(1),
    presence_penalty: Joi.number().min(-2).max(2),
    frequency_penalty: Joi.number().min(-2).max(2),
    logit_bias: Joi.object(),
    user: Joi.string()
}).default()

export const base = Joi.object({
    query: Joi.any().required(),
    body: Joi.object({
        openai: openai,
        apiKey: Joi.string().required()
    }).required(),
    user: user
}).required()
