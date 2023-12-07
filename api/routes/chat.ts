import { Router } from 'express'

import { ChatController } from '../controllers/chat'

export const chatRouter = Router()

chatRouter.post('/completion', ChatController.completion)
