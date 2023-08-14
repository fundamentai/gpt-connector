import { SessionAxios } from '../../interface/axiosSession'
import { variables as config } from '../../../config'

const axios = new SessionAxios({
    baseURL: config.LOGGER_MS
})

export async function status() {
    type person = {
        name: string
        surname: string
        id: string
    }[]

    var data: {
        inShiftNames: person[]
        inBreakNames: person[]
    }

    data = (
        await axios.request({
            method: 'GET',
            url: '/export/status'
        })
    ).data.result

    const result = {
        shift: data.inShiftNames.map((element: any) => {
            return `${element.name} ${element.surname}`
        }),
        break: data.inBreakNames.map((element: any) => {
            return `${element.name} ${element.surname}`
        })
    }

    return result
}
