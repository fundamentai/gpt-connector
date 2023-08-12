import Joi from 'joi'

import { message } from './history/common'

export var continueCompletion = Joi.object({
    query: Joi.object({
        systemKey: Joi.string().required(),
        historyId: Joi.string()
    }),

    body: Joi.object({
        openaiConfig: Joi.object({
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
        }).default(),

        message: message.required(),
        save: Joi.boolean().default(true),
        jsonParseContent: Joi.boolean().default(false)
    }).default()
}).default()
