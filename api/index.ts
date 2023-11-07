import express, { json } from 'express'
import morgan from 'morgan'
import { addRoutes } from './routes'
import { status500 } from 'backend-helper-kit'
import { variables as config } from '../config'
import { config as headerConfig } from './middlewares/header-config'
import { createSession } from './middlewares/session'

export const app = express()

createSession(app) // create session
app.use(morgan('dev')) // logging
app.use(json({ limit: '10mb' })) // parse json
app.use(headerConfig) // set headers
addRoutes(app) // add routes
app.use(status500) // handle errors

app.listen(config.PORT, () => console.log(`Server running! ✅`))
