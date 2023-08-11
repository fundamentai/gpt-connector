import Mongoose, { connection } from 'mongoose'
import { variables as config } from '../config'

Mongoose.connect(config.MONGO_CONNECTION)
    .then(() => {
        console.log(`Connected to the => ${config.MONGO_CONNECTION}`)
    })
    .catch((error) => {
        console.log(`Error connecting to the => ${config.MONGO_CONNECTION}`)
        console.log(error.message)
    })

export { connection }
