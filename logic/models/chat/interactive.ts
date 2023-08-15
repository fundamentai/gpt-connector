import * as openaiValidators from '../../validators/openai'
import { validate } from '../../helpers/validator'
import * as types from '../../types'

import * as chatValidators from '../../validators/interactiveChat'

import { continueCompletion } from './openai'

import * as functions from './functions'

import { ChatCompletionResponseMessage, CreateCompletionResponseUsage, ChatCompletionResponseMessageRoleEnum } from 'openai'

type gptRes = {
    historyId: string
    message:
        | ChatCompletionResponseMessage
        | {
              content: types.interactiveChatResponse
              role: ChatCompletionResponseMessageRoleEnum
          }
    tokens: CreateCompletionResponseUsage | undefined
}

/**
 * This function triggers the interactive chat based on the given completion and GPT response.
 * If no GPT response is provided, it fetches one by calling `continueCompletion` with the given completion.
 * The function handles the case where the response type is a 'function-call', and recursively processes the function calls.
 * @param {types.continueCompletion} completion - The completion to be used for the interactive chat.
 * @param {any} gptResponse - The GPT response, if available. If not provided, it's fetched using `continueCompletion`.
 * @returns {Promise<gptRes>} - The final GPT response after processing interactive chat.
 */
export async function trigger(completion: types.continueCompletion, gptResponse?: gptRes): Promise<gptRes> {
    // If no GPT response is provided, fetch one using the given completion.
    if (!gptResponse) {
        gptResponse = await continueCompletion(completion)
    }

    // Extract the interactive chat content from the GPT response.
    if (typeof gptResponse.message.content !== 'string') {
        validate(gptResponse.message.content!, chatValidators.interactiveChatResponse)
    } else {
        throw new Error('Invalid interactive chat response')
    }

    const interactiveChat = gptResponse.message.content as types.interactiveChatResponse

    // Check if the response type is a 'function-call'.
    if (interactiveChat['response-type'] === 'function-call') {
        // Call the specified function based on the interactive chat's call property.
        const result = await functions[interactiveChat.call as keyof typeof functions]()

        // Modify the completion with the result and update the historyId.
        completion.body!.message = { content: JSON.stringify(result), role: 'system' }
        completion.query!.historyId = gptResponse.historyId

        // Continue the completion process with the updated completion.
        gptResponse = await continueCompletion(completion)

        // Recursively trigger the function with the updated completion.
        return await trigger(completion, gptResponse)
    } else {
        // If the response type is not 'function-call', simply return the GPT response.
        return gptResponse
    }
}

export async function interactiveChat(params: types.continueCompletion) {
    params = validate(params, openaiValidators.continueCompletion)
    return await trigger(params)
}
