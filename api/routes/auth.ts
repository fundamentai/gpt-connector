import { Router } from 'express'
import { Auth } from '../controllers/auth'

const authRouter = Router()

//Routes
authRouter.get('/check', Auth.check)
authRouter.post('/login', Auth.login)
authRouter.get('/logout', Auth.logout)

export { authRouter }
