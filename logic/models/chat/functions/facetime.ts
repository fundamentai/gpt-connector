import { SessionAxios } from '../../../interface/axiosSession'
import { variables as config } from '../../../../config'

const axios = new SessionAxios({
    baseURL: config.FACETIME
})

export async function facetime() {
    console.log(axios)

    return (
        await axios.request({
            method: 'POST',
            url: 'http://localhost:8001/room/broadcast'
        })
    ).data
}
