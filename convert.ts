import { convert } from 'backend-helper-kit'

const data = [
    {
        schemaDirectory: './logic/validators/history',
        typeOutputDirectory: './logic/types/history'
    },
    {
        schemaDirectory: './logic/validators/user',
        typeOutputDirectory: './logic/types/user'
    },
    {
        schemaDirectory: './logic/validators/openai',
        typeOutputDirectory: './logic/types/openai'
    }
]

convert(data)
