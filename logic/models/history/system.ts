import * as validators from '../../validators/history'
import { validate } from '../../helpers/validator'
import * as types from '../../types/history/system'

import { Message, SystemMessage, SystemMessageModel } from '../../../database/models/history'

import { errorHelper } from './common'

import { filter } from '../../helpers/filter'

export async function getSystemMessage(params: types.getSystemMessage): Promise<Message> {
    params = validate(params, validators.getSystemMessage)

    const result = await SystemMessageModel.findOne(params.query)
    errorHelper.getError(result)

    return filter(result!.toJSON(), ['_id', 'key']) as Message
}

export async function createSystemMessage(params: types.createSystemMessage): Promise<Message> {
    params = validate(params, validators.createSystemMessage)

    const result = await SystemMessageModel.create(params.body)
    errorHelper.getError(result)

    return filter(result.toObject(), ['_id', 'key'])
}

export async function deleteSystemMessage(params: types.deleteSystemMessage): Promise<boolean> {
    params = validate(params, validators.deleteSystemMessage)

    const result = await SystemMessageModel.deleteOne(params.query)
    errorHelper.deleteError(result)

    return result.deletedCount > 0
}

export async function updateSystemMessage(params: types.updateSystemMessage): Promise<boolean> {
    params = validate(params, validators.updateSystemMessage)

    const result = await SystemMessageModel.updateOne(params.query, { $set: params.body })
    errorHelper.updateError(result)

    return result.modifiedCount > 0
}
