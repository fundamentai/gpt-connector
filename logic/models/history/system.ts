import * as validators from '../../validators/history'
import { validate } from '../../helpers/validator'
import * as types from '../../types/history/system'

import { Message, SystemMessage, SystemMessageModel } from '../../../database/models/history'

import { errorHelper } from './common'

import { getHistory } from '.'

import { filter } from '../../helpers/filter'

export async function getSystemMessage(params: types.getSystemMessage): Promise<Message[]> {
    params = validate(params, validators.getSystemMessage)

    const result = await SystemMessageModel.findOne(params.query)
    errorHelper.getError(result)

    const historyId = result!.history

    return await getHistory({
        query: {
            id: String(historyId)
        }
    })
}

export async function createSystemMessage(params: types.createSystemMessage): Promise<boolean> {
    params = validate(params, validators.createSystemMessage)

    const result = await SystemMessageModel.create({ key: params.query.key, history: params.body.id })
    errorHelper.getError(result)

    return !!result
}

export async function deleteSystemMessage(params: types.deleteSystemMessage): Promise<boolean> {
    params = validate(params, validators.deleteSystemMessage)

    const result = await SystemMessageModel.deleteOne(params.query)
    errorHelper.deleteError(result)

    return result.deletedCount > 0
}

export async function updateSystemMessage(params: types.updateSystemMessage): Promise<boolean> {
    params = validate(params, validators.updateSystemMessage)

    const result = await SystemMessageModel.updateOne(params.query, { $set: { history: params.body.id } })
    errorHelper.updateError(result)

    return result.modifiedCount > 0
}
