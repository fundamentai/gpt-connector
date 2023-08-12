import * as error from '../../errors/errors'
import { ahandler } from '../../errors/handle'

import * as historyLogic from '../../logic/models/history'

import { formatter } from './returnFormat'

export class HistoryController {
    @ahandler
    static async getHistory(req: any, res: any) {
        res.json(
            formatter(
                await historyLogic.getHistory({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async createHistory(req: any, res: any) {
        res.json(
            formatter(
                await historyLogic.createHistory({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async addMessage(req: any, res: any) {
        res.json(
            formatter(
                await historyLogic.addMessage({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }
}
