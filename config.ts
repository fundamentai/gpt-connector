import { validate } from 'backend-helper-kit'
import Joi from 'joi'

import { config } from 'dotenv'

config()
const env: configType = process.env as any

type configType = {
    PORT: number
    MONGO_CONNECTION: string
    MODULE_NAME: string
    MODULE_KEY: string
    SESSION_SECRET: string
    SAMPLE_MS: string
    ENV: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    SAMPLE_MS: Joi.string().uri().required(),
    ENV: Joi.string().valid('development', 'production').required()
})

export var variables = validate(
    {
        PORT: env.PORT,
        MONGO_CONNECTION: env.MONGO_CONNECTION,
        MODULE_KEY: env.MODULE_KEY,
        MODULE_NAME: env.MODULE_NAME,
        SESSION_SECRET: env.SESSION_SECRET,
        SAMPLE_MS: env.SAMPLE_MS,
        ENV: env.ENV
    },
    configSchema
) as configType

console.log(variables)
