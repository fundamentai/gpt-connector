import * as validators from '../validators/openai'
import { validate } from '../helpers/validator'
import * as types from '../types/openai'

import { completion } from '../interface/openai'
import { getHistory, addMessage, createHistory } from './history'
import { getSystemMessage } from './history/system'

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

    const [messages, systemMessages] = await Promise.all([
        getHistory({
            query: {
                id: historyId
            }
        }),
        getSystemMessage({
            query: {
                key: params!.query!.systemKey
            }
        })
    ])

    console.log({
        systemMessages: systemMessages,
        messages: messages,
        last: params.body!.message
    })

    const history = !params!.query!.historyId ? [...systemMessages, ...messages] : [...systemMessages, ...messages, params.body!.message]

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
        result.message.content = JSON.parse(result.message.content as string)
    }

    return { ...result, historyId: historyId }
}
