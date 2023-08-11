import { BaseError } from './errors'
import type { error } from './types'

export function toJson(err: BaseError | Error): {
    detail?: string
    message: string
    name: string
    status?: number
} {
    const json: error = {
        message: err.message,
        name: err.name
    }

    if (err instanceof BaseError) {
        json.detail = err.detail
        json.status = err.status
    }

    return json
}
