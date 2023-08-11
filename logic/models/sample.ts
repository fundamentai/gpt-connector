import * as validators from '../validators/sample'
import { validate } from '../helpers/validator'
import * as types from '../types/sample'

import { SampleModel, Sample } from '../../database/models/sample'

import { ErrorHelper } from '../helpers/error'
import { getModelName } from '../helpers/filename'

const errorHelper = new ErrorHelper(getModelName(__filename))

export async function createSample(params: types.createSample): Promise<Sample> {
    const value = validate(params, validators.createSample) as types.createSample

    const result = (await SampleModel.create(value.body)) as Sample
    errorHelper.createError(result)

    return result
}

export async function updateSample(params: types.updateSample): Promise<boolean> {
    const value = validate(params, validators.updateSample) as types.updateSample

    const result = await SampleModel.updateOne(value.query, { $set: value.body })
    errorHelper.updateError(result)

    return result.modifiedCount > 0
}

export async function deleteSample(params: types.deleteSample): Promise<boolean> {
    const value = validate(params, validators.deleteSample) as types.deleteSample

    const result = await SampleModel.deleteOne(value.query)
    errorHelper.deleteError(result)

    return result.deletedCount > 0
}

export async function querySample(params: types.getSample): Promise<Sample> {
    const value = validate(params, validators.getSample) as types.getSample

    const result = (await SampleModel.findOne(value.query)) as Sample
    errorHelper.getError(result)

    return result
}

export async function querySamples(params: types.getSamples): Promise<Sample[]> {
    const value = validate(params, validators.getSamples) as types.getSamples

    const result = (await SampleModel.find(value.query)) as Sample[]
    errorHelper.getAllError(result)

    return result
}
