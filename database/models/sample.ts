import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: { collection: 'sample', versionKey: false },
    options: { allowMixed: 0 }
})
export class Sample {
    @prop({ required: true })
    public name!: string

    @prop()
    public age?: number
}

export const SampleModel = getModelForClass(Sample)
