import { historyRouter } from './history'
import { authRouter } from './auth'

import { Express } from 'express'

export function addRoutes(app: Express) {
    app.use('/auth', authRouter)
    app.use('/history', historyRouter)
}
