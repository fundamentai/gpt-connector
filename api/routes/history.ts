import { Router } from 'express'

import { HistoryController } from '../controllers/history'

import { requireAcces } from '../middlewares/access'

export const router = Router()

router.get('/', HistoryController.getHistory)
router.post('/', HistoryController.createHistory)
router.post('/message', HistoryController.addMessage)
