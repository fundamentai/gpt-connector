import { Express } from 'express'
import Session from 'express-session'
import MongoStore from 'connect-mongo'

import { variables as config } from '../../config'

import type { user } from '../../logic/types/user/user'

declare module 'express-session' {
    interface SessionData {
        user: user
        cookie: Cookie
    }
}

export function createSession(app: Express) {
    app.use(
        Session({
            name: 'PROJECT_PHPSESSID',
            store: MongoStore.create({ mongoUrl: config.MONGO_CONNECTION }),
            secret: config.SESSION_SECRET,
            saveUninitialized: true,
            resave: false
        })
    )
}
