import { Request, Response, NextFunction } from 'express'

export function config(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
    } else {
        res.header('Access-Control-Allow-Origin', '*')
    }
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-PINGOTHER')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, HEAD, OPTIONS')
    res.header('Access-Control-Expose-Headers', 'Set-Cookie')
    next()
}
