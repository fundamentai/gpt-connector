import { validate } from '../helpers/validator'
import { decode } from '../helpers/JWT'

import * as validators from '../validators/user'
import type { user } from '../types/user'

import { ForbiddenError } from '../../errors/errors'

export function getUserFromToken(token: string): user {
    const result = decode(token)
    let { iat, exp, ...data } = result
    const value = validate(data, validators.user)

    return value
}
