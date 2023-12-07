import { Router } from 'express'

import { HistoryController } from '../controllers/history'

export const historyRouter = Router()

historyRouter.post('/send-message', HistoryController.sendMessage)
historyRouter.post('/related', HistoryController.newRelatedHistories)
historyRouter.put('/related', HistoryController.addRelatedHistory)
historyRouter.delete('/related', HistoryController.deleteRelatedHistory)
historyRouter.get('/messages', HistoryController.getMessages)
historyRouter.post('/', HistoryController.newHistory)
