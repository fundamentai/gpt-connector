import Joi from 'joi'

import { message } from './history/common'

export const interactiveChatResponse = Joi.object({
    call: Joi.string(),
    content: Joi.string(),
    'response-type': Joi.string().valid('function-call', 'assistant')
}).default()
