import OpenAI from 'openai'

export async function sendRequest(data: { openai: any; apiKey: string }) {
    const openai = new OpenAI({
        apiKey: data.apiKey
    })

    var result = await openai.chat.completions.create(data.openai)

    return result
}
