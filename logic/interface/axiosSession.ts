import axios from 'axios'

import { AxiosRequestConfig, AxiosInstance } from 'axios'

export class SessionAxios {
    Cookie: string = ''
    axiosInstance: AxiosInstance

    constructor(axiosConfig: AxiosRequestConfig) {
        axios.defaults.withCredentials = true
        this.axiosInstance = axios.create(axiosConfig)
    }

    public async request(config: AxiosRequestConfig) {
        if (!config.headers) {
            config.headers = {
                Cookie: this.Cookie
            }
        } else {
            config.headers.Cookie = this.Cookie
        }

        const response = await this.axiosInstance.request(config)

        if (response.headers['set-cookie']) {
            this.Cookie = response.headers['set-cookie'][0]
        }

        return response
    }
}
