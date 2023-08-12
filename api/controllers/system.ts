import { ahandler } from '../../errors/handle'

import * as systemLogic from '../../logic/models/history/system'

import { formatter } from './returnFormat'

export class SystemController {
    @ahandler
    static async getSystemMessage(req: any, res: any) {
        res.json(
            formatter(
                await systemLogic.getSystemMessage({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async createSystemMessage(req: any, res: any) {
        res.json(
            formatter(
                await systemLogic.createSystemMessage({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async deleteSystemMessage(req: any, res: any) {
        res.json(
            formatter(
                await systemLogic.deleteSystemMessage({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async updateSystemMessage(req: any, res: any) {
        res.json(
            formatter(
                await systemLogic.updateSystemMessage({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }
}
