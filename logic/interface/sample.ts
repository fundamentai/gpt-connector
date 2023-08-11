import { SessionAxios } from './axiosSession'
import { variables as config } from '../../config'

export const axios: SessionAxios = new SessionAxios({
    baseURL: config.SAMPLE_MS
})

export async function login(): Promise<boolean> {
    const response = await axios.request({
        url: '/login',
        method: 'POST',
        data: {
            name: config.MODULE_NAME,
            key: config.MODULE_KEY
        }
    })

    return response.data.result as boolean
}

export async function logout(): Promise<boolean> {
    const response = await axios.request({
        url: '/logout',
        method: 'POST'
    })

    return response.data.result as boolean
}

export async function check(): Promise<boolean> {
    const response = await axios.request({
        url: '/check',
        method: 'GET'
    })

    return response.data.result as boolean
}

export async function sampleLogic(): Promise<any> {
    const response = await axios.request({
        url: '/sample',
        method: 'GET'
    })

    return response.data.result
}
