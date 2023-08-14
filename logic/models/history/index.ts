import * as validators from '../../validators/history'
import { validate } from '../../helpers/validator'
import * as types from '../../types/history/'

import { History, HistoryModel, Message } from '../../../database/models/history'

import { errorHelper } from './common'

import { rename, filter } from '../../helpers/filter'

export async function getHistory(params: types.getHistory): Promise<Message[]> {
    validate(params, validators.getHistory)

    const result = (await HistoryModel.findOne(rename(params.query, 'id', '_id'), { _id: 0 }))?.toObject() as History
    errorHelper.getError(result)

    return result.messages
}
export async function createHistory(params: types.createHistory): Promise<{ id: string }> {
    validate(params, validators.createHistory)

    const result = await HistoryModel.create({ messages: [params.body] })
    errorHelper.getError(result)

    return rename(filter(result!.toObject(), ['messages']), '_id', 'id') as { id: string }
}

export async function addMessage(params: types.addMessage): Promise<boolean> {
    validate(params, validators.addMessage)

    const result = await HistoryModel.updateOne(rename(params.query, 'id', '_id'), { $push: { messages: params.body } })
    errorHelper.updateError(result)

    return result.modifiedCount > 0
}
