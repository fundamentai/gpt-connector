import * as types from '../../types/user/user'

export function checkAccess(requires?: any, user?: types.user): boolean {
    if (!requires) {
        return true
    }

    /*
        Do something here
    */

    return false
}
