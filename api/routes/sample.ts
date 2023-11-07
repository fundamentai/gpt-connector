import { Router } from 'express'

import { SampleController } from '../controllers/sample'

const sampleRouter = Router()

sampleRouter.get('/query', SampleController.getSample)
sampleRouter.get('/query/all/', SampleController.getSamples)
sampleRouter.post('/', SampleController.createSample)
sampleRouter.put('/', SampleController.updateSample)
sampleRouter.delete('/', SampleController.deleteSample)

export { sampleRouter }
