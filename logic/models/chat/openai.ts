import * as validators from '../../validators/openai'
import { validate } from '../../helpers/validator'
import * as types from '../../types/openai'

import { completion } from '../../interface/openai'
import { getHistory, addMessage, createHistory } from '../history'
import { getSystemMessage } from '../history/system'

export async function continueCompletion(params: types.continueCompletion) {
    params = validate(params, validators.continueCompletion)

    const historyId =
        params!.query!.historyId ||
        String(
            (
                await createHistory({
                    body: params!.body!.message
                })
            ).id
        )

    const [systemMessages, messages] = await Promise.all([
        getSystemMessage({
            query: {
                key: params!.query!.systemKey
            }
        }),
        getHistory({
            query: {
                id: historyId
            }
        })
    ])
    // if params.body.infoMessage is not null, then add it to the history

    const history = !params!.query!.historyId
        ? [...systemMessages, ...messages]
        : [...systemMessages, ...messages, params.body!.message, ...(params.body!.infoMessage ? [params.body!.infoMessage] : [])]

    const result = await completion({ messages: history, ...(params.body!.openaiConfig as any) })

    if (params.body!.save) {
        if (params.query?.historyId) {
            addMessage({
                query: {
                    id: historyId
                },
                body: params!.body!.message
            })
        }
        addMessage({
            query: {
                id: historyId
            },
            body: result.message as any
        })
    }

    if (params.body?.jsonParseContent) {
        try {
            result.message.content = JSON.parse(result.message.content as string)
        } catch {}
    }

    return { ...result, historyId: historyId }
}
