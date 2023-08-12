import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

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
export class SystemMessage {
    @prop({ required: true, unique: true })
    public key!: string

    @prop({ required: true })
    public content!: string

    @prop({ required: true, default: 'system' })
    public role!: 'system'
}

@modelOptions({
    schemaOptions: { versionKey: false },
    options: { allowMixed: 0 }
})
export class History {
    @prop({ required: true })
    public messages!: Message[]
}

export const HistoryModel = getModelForClass(History)
export const SystemMessageModel = getModelForClass(SystemMessage)
