import { BaseError } from '../../errors/errors'
import { AxiosError } from 'axios'

import { formatter } from '../controllers/returnFormat'

export function status500(err: BaseError | Error | AxiosError, req: any, res: any, next: any) {
    if (err instanceof AxiosError) {
        res.status(err.response?.status || err.response?.data?.status || 500)
        res.json({
            api_error: err.response?.data || err.response?.statusText || err.message
        })
        return next()
    }

    const json = formatter(err, 'Something went wrong', 'failed')

    if (!json.error!.status) {
        json.error!.status = 500
    }

    res.status(json.error!.status)
    delete json.error!.status
    res.json(json)

    next()
}
