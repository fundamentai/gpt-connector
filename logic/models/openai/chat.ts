import { sendRequest } from '.'

import * as inputTypes from '../../types/openai/input-type'
import * as outputTypes from '../../types/openai/output-type'

import * as inputValidators from '../../validators/openai/input-type'
import * as outputValidators from '../../validators/openai/output-type'

import { variables } from '../../../config'

import { avalidator as wrapper } from 'backend-helper-kit'

const avalidator = wrapper(inputValidators, outputValidators, variables)
// const errorHelper = new ErrorHelper(__filename)

import { MessageLogic } from '../history'

export class ChatLogic {
    @avalidator
    static async completion(params: inputTypes.completion): Promise<outputTypes.completion> {
        var messages = await MessageLogic.getMessages({
            query: params.query,
            body: {}
        })

        var gptResponse = await sendRequest({
            openai: {
                ...params.body.openai,
                messages: [...messages, params.body.message]
            },
            apiKey: params.body.apiKey
        })

        if (params.body.historyId) {
            var newMessages = [params.body.message, gptResponse.choices[0].message]

            await Promise.all(
                newMessages.map(async (message: any) => {
                    var result = await MessageLogic.sendMessage({
                        query: {
                            id: params.body.historyId
                        },
                        body: message
                    })
                    console.log(result)
                })
            )
        }

        return gptResponse
    }
}
