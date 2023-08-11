import { DatabaseError, NotFoundError, CreateError } from '../../errors/errors'

function acknowledged() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = function (...args: any[]) {
            if (args[0]?.acknowledged === false) {
                throw new DatabaseError(`Something went wrong with database!`)
            }
            return originalMethod.apply(this, args)
        }
        return descriptor
    }
}

export class ErrorHelper {
    public modelName: string

    constructor(modelName: string) {
        this.modelName = modelName
    }

    notFound(name: string) {
        return new NotFoundError(`${name} not found!`)
    }

    createError(result: any) {
        if (!result) {
            throw new CreateError(`Error creating ${this.modelName}`)
        }
    }

    @acknowledged()
    updateError(result: any, name?: string) {
        if (result.matchedCount === 0) {
            throw this.notFound(name || this.modelName)
        }
    }

    getError(result: any, name?: string) {
        if (!result) {
            throw this.notFound(name || this.modelName)
        }
    }

    @acknowledged()
    getAllError(result: any, name?: string) {
        if (result.length === 0) {
            throw this.notFound(name || this.modelName)
        }
    }

    @acknowledged()
    deleteError(result: any, name?: string) {
        if (result.deletedCount === 0) {
            throw this.notFound(name || this.modelName)
        }
    }
}
