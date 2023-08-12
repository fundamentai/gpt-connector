import { Router } from 'express'

import { OpenAIController } from '../controllers/openai'

export const router = Router()

router.post('/continueCompletion', OpenAIController.continueCompletion)
