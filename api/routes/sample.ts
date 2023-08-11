import { Router } from 'express'

import { SampleController } from '../controllers/sample'

import { requireAcces } from '../middlewares/access'

const router = Router()

router.get('/query', requireAcces(['sample', 'read']), SampleController.querySample)
router.get('/query/all/', requireAcces(['sample', 'read', 'all']), SampleController.querySamples)
router.post('/', requireAcces(['sample', 'create']), SampleController.createSample)
router.put('/', requireAcces(['sample', 'update']), SampleController.updateSample)
router.delete('/', requireAcces(['sample', 'delete']), SampleController.deleteSample)

export { router }
