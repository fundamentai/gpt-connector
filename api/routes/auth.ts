import { Router } from 'express'

//Require controllers
import { Auth } from '../controllers/auth'
//Initilaziation
const router = Router()

//Routes
router.get('/check', Auth.check)
router.post('/login', Auth.login)
router.get('/logout', Auth.logout)

export { router }
