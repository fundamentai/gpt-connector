import { convert } from 'backend-helper-kit'

const data = [
    {
        schemaDirectory: './logic/validators/history',
        typeOutputDirectory: './logic/types/history'
    },
    {
        schemaDirectory: './logic/validators/user',
        typeOutputDirectory: './logic/types/user'
    }
]

convert(data)
