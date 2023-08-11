import { ForbiddenError } from '../../errors/errors'
import * as types from '../../logic/types/user'

export function hasAccess(access: string[], user: types.user): boolean {
    let tempPermissons = user.permissions
    access.forEach((item) => {
        if (tempPermissons[item]) {
            tempPermissons = tempPermissons[item]
        } else {
            throw new ForbiddenError(`You not have ${access.join('->')} access`)
        }
    })

    return true
}
export function requireAcces(requires: string[]) {
    return (req: any, res: any, next: any) => {
        if (!req?.session?.user) throw new ForbiddenError('User not logged in')
        if (hasAccess(requires, req.session.user)) next()
    }
}
