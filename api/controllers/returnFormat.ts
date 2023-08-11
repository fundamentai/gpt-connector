import { toJson } from '../../errors/json'

interface returnType {
    result?: object
    error?: {
        detail?: string
        message: string
        name: string
        status?: number
    }
    message?: string
    status?: string | number
}

export function formatter(data: any, message: string = '', status: string = 'success'): returnType {
    if (message === '') {
        return {
            result: data,
            status: status
        }
    }

    if (data instanceof Error) {
        return {
            error: toJson(data),
            message: message,
            status: status
        }
    }

    return {
        result: data,
        message: message,
        status: status
    }
}
