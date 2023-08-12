// Require dependencies
import Express from 'express' // Http server
import Morgan from 'morgan' // Terminal logging
import { status500 } from '../api/middlewares/handle' // Error Models
import Session from 'express-session' //Express session manager
import MongoStore from 'connect-mongo' //Session manager for MongoDB, Express
import { variables as config } from '../config'
// Initilaziation
const app = Express()

// Session Start
app.use(
    Session({
        name: 'PROJECT_PHPSESSID',
        store: MongoStore.create({ mongoUrl: config.MONGO_CONNECTION }),
        secret: config.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    })
)

// Middlewares
app.use(Morgan('dev'))
app.use(Express.json({ limit: '10mb' }))

app.use((req, res, next) => {
    // allow all origins
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-PINGOTHER')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, HEAD, OPTIONS')
    res.header('Access-Control-Expose-Headers', 'Set-Cookie')
    next()
})

// routes
import { router as authRouter } from './routes/auth'
import { router as historyRouter } from './routes/history'
import { router as systemRouter } from './routes/system'
import { router as openaiRouter } from './routes/openai'

app.use('/auth', authRouter)
app.use('/history', historyRouter)
app.use('/system', systemRouter)
app.use('/openai', openaiRouter)

// Error Handling
app.use(status500)

// Listen for requests
app.listen(config.PORT, () => console.log(`API => Listening on port ${config.PORT}`))

export { app }
