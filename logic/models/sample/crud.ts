import * as inputTypes from '../../types/sample/input-type'
import * as outputTypes from '../../types/sample/output-type'

import * as inputValidators from '../../validators/sample/input-type'
import * as outputValidators from '../../validators/sample/output-type'

import { ErrorHelper, deleteId, avalidator as wrapper } from 'backend-helper-kit'

import { SampleModel } from '../../../database/models/sample'
import { variables as config } from '../../../config'

const avalidator = wrapper(inputValidators, outputValidators, config)
const errorHelper = new ErrorHelper(__filename)

export class SampleLogic {
    @avalidator
    @deleteId
    static async createSample(params: inputTypes.createSample): Promise<outputTypes.createSample> {
        var result = await SampleModel.create(params.body)
        errorHelper.createError(result)

        result = result.toObject()
        return result
    }

    @avalidator
    static async updateSample(params: inputTypes.updateSample): Promise<outputTypes.updateSample> {
        var result = await SampleModel.updateOne(params.query, { $set: params.body })
        errorHelper.updateError(result)

        return result.modifiedCount > 0
    }

    @avalidator
    static async deleteSample(params: inputTypes.deleteSample): Promise<outputTypes.deleteSample> {
        var result = await SampleModel.deleteOne(params.query)
        errorHelper.deleteError(result)

        return result.deletedCount > 0
    }

    @avalidator
    @deleteId
    static async getSample(params: inputTypes.getSample): Promise<outputTypes.getSample> {
        var result = await SampleModel.findOne(params.query)
        errorHelper.getError(result)

        return result!.toObject()
    }

    @avalidator
    @deleteId
    static async getSamples(params: inputTypes.getSamples): Promise<outputTypes.getSamples> {
        var result = await SampleModel.find(params.query)
        errorHelper.getAllError(result)

        return result.map((item) => {
            return item.toObject()
        })
    }
}
