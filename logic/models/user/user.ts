import { validate, decode } from 'backend-helper-kit'

import * as validators from '../../validators/user/user'
import type { user } from '../../types/user'

import { variables as config } from '../../../config'

export function getUserFromToken(token: string): user {
    return validate(decode(token, config.MODULE_KEY).data, validators.user) as user
}
