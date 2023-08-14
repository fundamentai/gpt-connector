import { ahandler } from '../../errors/handle'

import * as openai from '../../logic/models/openai'
import * as interactiveChat from '../../logic/models/interactiveChat'

import { formatter } from './returnFormat'

export class OpenAIController {
    @ahandler
    static async continueCompletion(req: any, res: any) {
        res.json(
            formatter(
                await openai.continueCompletion({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async interactiveChat(req: any, res: any) {
        res.json(
            formatter(
                await interactiveChat.interactiveChat({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }
}
