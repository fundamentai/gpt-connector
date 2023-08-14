import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: { versionKey: false },
    options: { allowMixed: 0 }
})
export class Message {
    @prop({ required: true })
    public content!: string

    @prop({ required: true })
    public role!: 'function' | 'user' | 'system' | 'assistant'
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
export class SystemMessage {
    @prop({ required: true, unique: true })
    public key!: string

    @prop({ required: true, ref: History })
    public history!: Ref<History>
}

export const HistoryModel = getModelForClass(History)
export const SystemMessageModel = getModelForClass(SystemMessage)
