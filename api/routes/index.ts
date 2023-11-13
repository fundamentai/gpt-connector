import { authRouter } from './auth'
import { chatRouter } from './chat'
import { historyRouter } from './history'

import { Express } from 'express'

export function addRoutes(app: Express) {
    app.use('/auth', authRouter)
    app.use('/chat', chatRouter)
    app.use('/history', historyRouter)
}
