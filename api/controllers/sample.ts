import * as sampleLogic from '../../logic/models/sample'
import { ahandler } from '../../errors/handle'

import { formatter } from './returnFormat'

export class SampleController {
    @ahandler
    static async createSample(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.createSample({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async updateSample(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.updateSample({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async deleteSample(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.deleteSample({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async querySample(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.querySample({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async querySamples(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.querySamples({
                    query: req.query
                })
            )
        )
    }
}
