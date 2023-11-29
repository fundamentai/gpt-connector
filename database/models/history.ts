import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: { versionKey: false, timestamps: true },
    options: { allowMixed: 0 }
})
export class Message {
    @prop({ required: true })
    public content!: string

    @prop({ required: true })
    public role!: 'function' | 'user' | 'system' | 'assistant'

    @prop({ required: true })
    public date!: Date
}

@modelOptions({
    schemaOptions: { versionKey: false },
    options: { allowMixed: 0 }
})
export class History {
    @prop({ required: true })
    public messages!: Message[]
}

@modelOptions({
    schemaOptions: { versionKey: false },
    options: { allowMixed: 0 }
})
export class RelatedHistories {
    @prop({ required: true })
    public histories!: Ref<History>[]
}

export const HistoryModel = getModelForClass(History)
export const RelatedHistoriesModel = getModelForClass(RelatedHistories)
