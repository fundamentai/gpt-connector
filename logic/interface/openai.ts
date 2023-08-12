import { Configuration, OpenAIApi, ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'
import { ChatGPTError } from '../../errors/errors'

import { variables as config } from '../../config'

const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export async function completion(data: CreateChatCompletionRequest) {
    try {
        var completion = await openai.createChatCompletion(data)
    } catch (e: any) {
        throw new ChatGPTError(e.response.data.error.message)
    }

    const result = completion.data.choices[0].message
    const tokens = completion.data.usage

    if (!result) {
        throw new ChatGPTError('No response from AI')
    }

    return {
        message: result,
        tokens: tokens
    }
}
