import { ChatLogic } from '../../logic/models/openai/chat'

import { ahandler, formatter as wrapper } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

var formatter = wrapper(ChatLogic)

type status = {
    continue: boolean
    next: boolean
}

export class ChatController {
    @ahandler
    @formatter
    static async completion(req: Request, res: Response, next: NextFunction): Promise<status | void> {}
}
