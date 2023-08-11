import JWT from 'jsonwebtoken'
import { variables as config } from '../../config'

import { ForbiddenError } from '../../errors/errors'

export function decode(token: string) {
    try {
        const result = JWT.verify(token, config.MODULE_KEY)
        if (typeof result === 'string') {
            throw result
        }
        return result
    } catch (error: any) {
        throw new ForbiddenError(error.message)
    }
}
