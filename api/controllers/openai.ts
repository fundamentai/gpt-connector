import { ahandler } from '../../errors/handle'

import * as openai from '../../logic/models/openai'

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
}
