import * as error from '../../errors/errors'
import { getUserFromToken } from '../../logic/models/user'
import { ahandler } from '../../errors/handle'

import { login } from '../../logic/validators/user'
import { validate } from '../../logic/helpers/validator'

export class Auth {
    @ahandler
    static async login(req: any, res: any) {
        if (req.session?.user) {
            throw new error.SessionError('User already logged in')
        }

        validate(req.body, login)

        let user = getUserFromToken(req.body.token)

        req.session.user = user

        return res.json({ result: true })
    }

    @ahandler
    static async logout(req: any, res: any, next: any) {
        if (!req?.session?.user) throw new error.SessionError('User not logged in')
        req.session.destroy()
        return res.json({ result: true })
    }

    @ahandler
    static async check(req: any, res: any) {
        return res.json({ result: !!req.session.user })
    }
}
