import { Router } from 'express'

import { SystemController } from '../controllers/system'

export const router = Router()

router.get('/', SystemController.getSystemMessage)
router.post('/', SystemController.createSystemMessage)
router.delete('/', SystemController.deleteSystemMessage)
router.put('/', SystemController.updateSystemMessage)
