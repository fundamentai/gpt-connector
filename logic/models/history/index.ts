import * as inputTypes from '../../types/history/input-type'
import * as outputTypes from '../../types/history/output-type'

import * as inputValidators from '../../validators/history/input-type'
import * as outputValidators from '../../validators/history/output-type'

import { variables } from '../../../config'

import { ErrorHelper, avalidator as wrapper } from 'backend-helper-kit'

import { HistoryModel, RelatedHistoriesModel } from '../../../database/models/history'

const avalidator = wrapper(inputValidators, outputValidators, variables)
const errorHelper = new ErrorHelper(__filename)

async function checkHistoryIdIsAvailable(id: string): Promise<boolean> {
    var result = await HistoryModel.findOne({
        _id: id
    })

    errorHelper.getAllError({ result, text: `History not found! ${id}` })
    return !!result
}

export class RelatedHistoriesLogic {
    @avalidator
    static async newRelatedHistories(params: inputTypes.newRelatedHistories): Promise<outputTypes.newRelatedHistories> {
        if (params.body.histories.length !== 0) {
            var err: string = ''
            await Promise.all(
                params.body.histories.map(async (historyId) => {
                    await checkHistoryIdIsAvailable(historyId)
                })
            )

            if (err !== '') {
                throw new Error(err)
            }
        }

        var result = await RelatedHistoriesModel.create(params.body)

        errorHelper.createError({ result, name: 'Related Histories' })
        return result._id.toString()
    }

    @avalidator
    static async addRelatedHistory(params: inputTypes.addRelatedHistory): Promise<outputTypes.addRelatedHistory> {
        checkHistoryIdIsAvailable(params.body.historyId)

        var result = await RelatedHistoriesModel.updateOne(
            {
                _id: params.query.relatedId
            },
            {
                $push: {
                    histories: {
                        $each: [params.body.historyId],
                        $position: params.body.insert
                    }
                }
            }
        )

        errorHelper.updateError({ result, name: 'Related Histories' })
        return result.modifiedCount === 1
    }

    @avalidator
    static async deleteRelatedHistory(params: inputTypes.deleteRelatedHistory): Promise<outputTypes.deleteRelatedHistory> {
        var result = await RelatedHistoriesModel.updateOne(
            {
                _id: params.query.relatedId
            },
            {
                $pull: {
                    histories: params.query.historyId
                }
            }
        )

        errorHelper.updateError({ result, name: 'Related Histories' })
        return result.modifiedCount === 1
    }
}

export async function getRelatedMessages(id: string) {
    var relatedHistories = await RelatedHistoriesModel.findOne({
        _id: id
    })

    errorHelper.getAllError({ result: relatedHistories, name: 'Related Histories' })

    var orderedHistories: any = {}
    var histories = await HistoryModel.find({
        _id: {
            $in: relatedHistories!.histories
        }
    })
    histories.forEach((history) => {
        orderedHistories[history._id.toString()] = history.messages
    })

    errorHelper.getAllError({ result: histories, name: 'Histories' })

    // concat messages
    var messages: outputTypes.getMessages = []

    relatedHistories!.histories.forEach((history: any) => {
        messages = [...messages, ...orderedHistories[history]]
    })

    return messages
}

export class HistoryLogic {
    @avalidator
    static async newHistory(params: inputTypes.newHistory): Promise<outputTypes.newHistory> {
        var result = await HistoryModel.create(params.body)

        errorHelper.createError({ result, name: 'History' })
        return result._id.toString()
    }
}

export class MessageLogic {
    @avalidator
    static async sendMessage(params: inputTypes.sendMessage): Promise<outputTypes.sendMessage> {
        if (!params.query.id) {
            var newHistory = (
                await HistoryModel.create({
                    messages: []
                })
            ).toObject()

            errorHelper.createError({ result: newHistory, text: 'Chat can not be created!' })
        }

        var result = await HistoryModel.updateOne(
            {
                _id: params.query.id || newHistory!._id
            },
            {
                $push: {
                    messages: !Array.isArray(params.body)
                        ? {
                              ...params.body,
                              date: new Date()
                          }
                        : {
                              $each: params.body.map((message) => ({
                                  ...message,
                                  date: new Date()
                              }))
                          }
                }
            }
        )

        errorHelper.updateError({ result, text: 'Message can not sent!' })
        return params.query.id ? true : newHistory!._id.toString()
    }

    @avalidator
    static async getMessages(params: inputTypes.getMessages): Promise<outputTypes.getMessages> {
        var result

        if (!!params.query.relatedId && !!params.query.historyId) {
            // get both
            var relatedMessages = await getRelatedMessages(params.query.relatedId)
            var historyMessages = await HistoryModel.findOne({
                _id: params.query.historyId
            })

            result = {
                messages: [...relatedMessages, ...historyMessages!.messages]
            }
        } else {
            if (params.query.relatedId) {
                let messages = await getRelatedMessages(params.query.relatedId)

                result = {
                    messages
                }
            } else if (params.query.historyId) {
                result = await HistoryModel.findOne({
                    _id: params.query.historyId
                })
            }
        }

        errorHelper.getAllError({ result, text: 'Messages can not read!' })

        return result?.messages!
    }
}
