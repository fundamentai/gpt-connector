import { historyRouter } from './history'
import { sampleRouter } from './sample'
import { authRouter } from './auth'

import { Express } from 'express'

export function addRoutes(app: Express) {
    app.use('/auth', authRouter)
    app.use('/sample', sampleRouter)
    app.use('/history', historyRouter)
}
