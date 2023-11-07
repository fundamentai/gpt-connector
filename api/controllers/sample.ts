import { SampleLogic } from '../../logic/models/sample'

import { ahandler, formatter as wrapper } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

const formatter = wrapper(SampleLogic)

type status = {
    continue: boolean
    next: boolean
}

export class SampleController {
    @ahandler
    @formatter
    static async createSample(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async updateSample(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async deleteSample(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async getSample(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async getSamples(req: Request, res: Response, next: NextFunction): Promise<status | void> {}
}
