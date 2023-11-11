import { RelatedHistoriesLogic, MessageLogic, HistoryLogic } from '../../logic/models/history'
import { ahandler, formatter as wrapper } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

const relatedFormatter = wrapper(RelatedHistoriesLogic)
const messageFormatter = wrapper(MessageLogic)
const historyFormatter = wrapper(HistoryLogic)

type status = {
    continue: boolean
    next: boolean
}

export class HistoryController {
    @ahandler
    @messageFormatter
    static async sendMessage(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @messageFormatter
    static async getMessages(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @historyFormatter
    static async newHistory(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @relatedFormatter
    static async newRelatedHistories(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @relatedFormatter
    static async addRelatedHistory(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @relatedFormatter
    static async deleteRelatedHistory(req: Request, res: Response, next: NextFunction): Promise<status | void> {}
}
